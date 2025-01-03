import { escapeMemberName } from "./escape-member-name";
import { parse } from "./json-parser/json";

type Position = {
  line: number;
  column: number;
};

type Location = {
  start: Position;
  end: Position;
};

type BaseNode = {
  type: "object" | "array" | "member" | "primitive";
  path: string | undefined;
  location: Location;
  children: Node[] | undefined;
};

type ObjectNode = BaseNode & {
  type: "object";
};

type MemberNode = BaseNode & {
  type: "member";
  name: string;
};

type ArrayNode = BaseNode & {
  type: "array";
};

type PrimitiveNode = BaseNode & {
  type: "primitive";
  children: undefined;
};

export type Node = ObjectNode | MemberNode | ArrayNode | PrimitiveNode;

const inPosition = (node: Node, position: Position) => {
  const { start, end } = node.location;

  const withinStart =
    start.line < position.line ||
    (start.line === position.line && start.column <= position.column);
  const withinEnd =
    end.line > position.line ||
    (end.line === position.line && end.column >= position.column);

  return withinStart && withinEnd;
};

const traverseNormalizedPath = (node: Node, path: string): void => {
  if (node.type === "member") {
    node.path = `${path}['${escapeMemberName(node.name)}']`;
  } else {
    node.path = path;
  }

  if (node.children) {
    if (node.type === "object") {
      for (const child of node.children) {
        traverseNormalizedPath(child, node.path);
      }
    } else if (node.type === "array") {
      for (let i = 0; i < node.children.length; i++) {
        traverseNormalizedPath(node.children[i], `${path}[${i}]`);
      }
      return;
    } else if (node.type === "member") {
      traverseNormalizedPath(node.children[0], node.path);
    }
  }
};

export const generateNormalizedPathNode = (json: string): Node => {
  const rootNode = parse(json) as Node;
  traverseNormalizedPath(rootNode, "$");
  return rootNode;
};

export const findSmallestNode = (
  node: Node,
  position: Position
): Node | undefined => {
  if (inPosition(node, position)) {
    if (node.children) {
      const children = node.children
        .map((child) => findSmallestNode(child, position))
        .filter((child) => child !== undefined);
      if (children.length > 0) {
        return children[0];
      }
    }
    return node;
  } else {
    return undefined;
  }
};

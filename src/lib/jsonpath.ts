import type { Engine } from "@/types/engine";
import { JSONPath } from "jsonpath-plus";
import type { JSONValue } from "@/types/json";
import { JSONPathJS } from "jsonpath-js";

export const evalJsonPath = (
  engine: Engine,
  document: JSONValue,
  query: string
): { values: JSONValue[]; paths: string[] } => {
  switch (engine) {
    case "rfc9535": {
      const result = new JSONPathJS(query).paths(document);
      return {
        values: result.map((path) => path.value),
        paths: result.map((path) => path.path),
      };
    }
    case "jsonpath-plus": {
      const results = JSONPath({
        json: document,
        path: query,
        resultType: "all",
      }) as {
        path: string;
        value: JSONValue;
      }[];

      return {
        values: results.map((result) => result.value),
        paths: results.map((result) => result.path),
      };
    }
    default:
      engine satisfies never;
      throw new Error(`Unknown engine: ${engine}`);
  }
};

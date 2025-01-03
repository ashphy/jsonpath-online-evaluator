import { Engine } from "@/types/engine";
import { JSONPath } from "jsonpath-plus";
import { JSONValue } from "@/types/json";
import { JSONPathJS } from "jsonpath-js";

export const evalJsonPath = (
  engine: Engine,
  document: JSONValue,
  query: string
) => {
  switch (engine) {
    case "rfc9535":
      return new JSONPathJS(query).find(document);
    case "jsonpath-plus":
      return JSONPath({
        json: document,
        path: query,
      });
    default:
      engine satisfies never;
  }
};

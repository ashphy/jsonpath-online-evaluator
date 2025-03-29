import { useAtom, useAtomValue } from "jotai";
import { atom } from "jotai";
import SampleJsonFile from "../assets/sample.json?raw";
import type { JSONValue } from "@/types/json";
import type { Engine } from "@/types/engine";
import { evalJsonPath } from "@/lib/jsonpath";

type JSONPathResult =
  | {
      isValid: true;
      values: JSONValue;
      paths: string[];
      error: undefined;
    }
  | {
      isValid: false;
      values: undefined;
      paths: undefined;
      error: string;
    };

type JSONDocument =
  | {
      json: JSONValue;
      error: undefined;
    }
  | {
      json: undefined;
      error: string;
    };

const engineAtom = atom<Engine>("rfc9535");
const queryAtom = atom("$.phoneNumbers[:1].type");

const documentAtom = atom(SampleJsonFile);
const jsonDocumentAtom = atom<JSONDocument>((get) => {
  try {
    const jsonDocument = JSON.parse(get(documentAtom)) as JSONValue;
    return {
      json: jsonDocument,
      error: undefined,
    };
  } catch (error) {
    return {
      json: undefined,
      error: String(error),
    };
  }
});

const resultAtom = atom<JSONPathResult>((get) => {
  const jsonDocument = get(jsonDocumentAtom);
  const query = get(queryAtom).trim();

  try {
    const { values, paths } = evalJsonPath(
      get(engineAtom),
      jsonDocument.error === undefined ? jsonDocument.json : {},
      query
    );

    return {
      isValid: true,
      values: values,
      paths: paths,
      error: undefined,
    };
  } catch (error) {
    return {
      isValid: false,
      values: undefined,
      paths: undefined,
      error: String(error),
    };
  }
});

export const useJSONPath = () => {
  const [engine, setEngine] = useAtom(engineAtom);
  const [query, setQuery] = useAtom(queryAtom);
  const [document, setDocument] = useAtom(documentAtom);
  const jsonDocument = useAtomValue(jsonDocumentAtom);
  const result = useAtomValue(resultAtom);

  return {
    engine,
    setEngine,
    query,
    setQuery,
    document,
    jsonDocument,
    setDocument,
    result,
  };
};

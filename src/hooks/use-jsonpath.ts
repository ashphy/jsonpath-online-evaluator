import { useAtom, useAtomValue } from "jotai";
import { atom } from "jotai";
import SampleJsonFile from "../assets/sample.json?raw";
import type { JSONValue } from "@/types/json";
import type { Engine } from "@/types/engine";
import { evalJsonPath } from "@/lib/jsonpath";
import { compress, decompress } from "@/lib/compress";
import { useCallback, useEffect } from "react";
import { Session, SessionSchema } from "@/types/session";
import * as v from "valibot";

const STORAGE_KEY_SESION = "joe-session";

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

const DEFAULT_SESSION: Session = {
  setting: {
    engine: "rfc9535",
    outputPaths: false,
  },
  query: "$.phoneNumbers[:1].type",
  document: SampleJsonFile,
} as const;

const loadSessionFromURLHash = async (): Promise<Session | undefined> => {
  const hash = window.location.hash.slice(1);
  if (hash === "") return undefined;
  try {
    const decompressed = await decompress(hash);
    return v.parse(SessionSchema, decompressed);
  } catch {
    return undefined;
  }
};

const loadSessionFromLocalStorage = async (): Promise<Session | undefined> => {
  const session = localStorage.getItem(STORAGE_KEY_SESION);
  if (!session) return undefined;
  try {
    return v.parse(SessionSchema, JSON.parse(session));
  } catch {
    return undefined;
  }
};

/**
 * Load session from URL hash or local storage
 */
const loadSession = async (): Promise<Session> => {
  // How to load session:
  // 1. Retrieve from the URL hash
  // 2. Retrieve from local storage
  // 3. Use default values
  const sessionFromURL = await loadSessionFromURLHash();
  if (sessionFromURL) {
    return sessionFromURL;
  } else {
    const sessionFromLocalStorage = await loadSessionFromLocalStorage();
    if (sessionFromLocalStorage) {
      return sessionFromLocalStorage;
    }
    return DEFAULT_SESSION;
  }
};

const initialSession = await loadSession();

const engineAtom = atom<Engine>(initialSession.setting.engine);
const outputPathsAtom = atom(initialSession.setting.outputPaths);
const queryAtom = atom(initialSession.query);
const documentAtom = atom(initialSession.document);

const sessionAtom = atom<Session>((get) => ({
  setting: {
    engine: get(engineAtom),
    outputPaths: get(outputPathsAtom),
  },
  query: get(queryAtom),
  document: get(documentAtom),
}));

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
  const [outputPaths, setOutputPaths] = useAtom(outputPathsAtom);
  const [query, setQuery] = useAtom(queryAtom);
  const [document, setDocument] = useAtom(documentAtom);

  const jsonDocument = useAtomValue(jsonDocumentAtom);
  const result = useAtomValue(resultAtom);

  const session = useAtomValue(sessionAtom);
  useEffect(() => {
    // Save session to local storage
    localStorage.setItem(STORAGE_KEY_SESION, JSON.stringify(session));
  }, [session]);

  const createShareURL = useCallback(async () => {
    const param: Session = {
      setting: {
        engine: engine,
        outputPaths: outputPaths,
      },
      query,
      document,
    };
    const encoded = await compress(param);
    window.location.hash = encoded;
    return window.location.href;
  }, [engine, outputPaths, query, document]);

  const reset = useCallback(() => {
    setEngine(DEFAULT_SESSION.setting.engine);
    setOutputPaths(DEFAULT_SESSION.setting.outputPaths);
    setQuery(DEFAULT_SESSION.query);
    setDocument(DEFAULT_SESSION.document);
    window.location.hash = "";
  }, [setDocument, setEngine, setOutputPaths, setQuery]);

  return {
    engine,
    setEngine,
    outputPaths,
    setOutputPaths,
    query,
    setQuery,
    document,
    jsonDocument,
    setDocument,
    result,
    createShareURL,
    reset,
  };
};

export const engines = [
  { value: "rfc9535", label: "RFC 9535" },
  { value: "jsonpath-plus", label: "JSONPath Plus" },
] as const;

/**
 * JSONPath Query Engine
 */
export type Engine = (typeof engines)[number]["value"];

export const parseEngine = (engine: string): Engine | undefined => {
  return engines.find((e) => e.value === engine)?.value;
};

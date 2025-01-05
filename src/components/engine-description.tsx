import { useJSONPath } from "@/hooks/use-jsonpath";
import { ExternalLink } from "./external-link";

export const EngineDescription = () => {
  const { engine } = useJSONPath();

  const getDescription = () => {
    switch (engine) {
      case "rfc9535":
        return (
          <>
            <ExternalLink href="https://www.rfc-editor.org/rfc/rfc9535.html">
              RFC 9535 - JSONPath: Query Expressions for JSON
            </ExternalLink>
            <ExternalLink href="https://github.com/ashphy/jsonpath-js">
              Parser: jsonpath-js
            </ExternalLink>
          </>
        );
      case "jsonpath-plus":
        return (
          <ExternalLink href="https://github.com/JSONPath-Plus/JSONPath">
            Parser: JSONPath Plus
          </ExternalLink>
        );
      default:
        engine satisfies never;
        break;
    }
  };

  return (
    <div className="flex gap-6 text-sm text-slate-600">{getDescription()}</div>
  );
};

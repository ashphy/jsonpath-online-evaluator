import { useJSONPath } from "@/hooks/use-jsonpath";
import Editor from "@monaco-editor/react";

export const Result = () => {
  const { result } = useJSONPath();
  const text = result.isValid ? JSON.stringify(result.result, null, 2) : "[]";

  return (
    <Editor
      className="border-2"
      height="600px"
      path="result"
      defaultLanguage="json"
      value={text}
      loading="Loading..."
      options={{
        wordWrap: "on",
        readOnly: true,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
      }}
    />
  );
};

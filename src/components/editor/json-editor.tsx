import { useJSONPath } from "@/hooks/use-jsonpath";
import Editor, { OnMount } from "@monaco-editor/react";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import {
  Node,
  findSmallestNode,
  generateNormalizedPathNode,
} from "@/lib/normalized-path";
import { DropZone } from "../drop-zone";

export const JSONEditor = () => {
  const { document, setDocument, jsonDocument } = useJSONPath();
  const normalizedPathNodeRef = useRef<Node | undefined>(undefined);

  useEffect(() => {
    try {
      normalizedPathNodeRef.current = generateNormalizedPathNode(document);
    } catch {
      normalizedPathNodeRef.current = undefined;
    }
  }, [document]);

  const handleEditorDidMount: OnMount = async (editor, monaco) => {
    monaco.languages.registerHoverProvider("json", {
      provideHover(model, position) {
        // Hover normalized path on the document only
        if (model.id !== editor.getModel()?.id) return undefined;

        // When the document is invalid, hovers none
        if (!normalizedPathNodeRef.current) return undefined;

        // Find the smallest node that contains the position
        const foundNode = findSmallestNode(normalizedPathNodeRef.current, {
          line: position.lineNumber,
          column: position.column,
        });

        if (foundNode?.path) {
          return {
            range: new monaco.Range(
              foundNode?.location.start.line,
              foundNode?.location.start.column,
              foundNode?.location.end.line,
              foundNode?.location.end.column
            ),
            contents: [
              { value: "**Normalized Path**" },
              {
                value: foundNode.path,
              },
            ],
          };
        }

        return undefined;
      },
    });
  };

  const handleOnChange = (value: string | undefined) => {
    setDocument(value || "");
  };

  const handleOnDrop = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setDocument(content);
    };
    reader.readAsText(file);
  };

  return (
    <DropZone onDrop={handleOnDrop}>
      <Editor
        className={cn("border-2", jsonDocument.error && "border-red-400")}
        height="600px"
        path="json"
        defaultLanguage="json"
        value={document}
        loading="Loading..."
        onMount={handleEditorDidMount}
        onChange={handleOnChange}
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </DropZone>
  );
};

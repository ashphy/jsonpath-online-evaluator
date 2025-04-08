import { useRef } from "react";
import { Button } from "./ui/button";
import { useJSONPath } from "@/hooks/use-jsonpath";

export const ImportFile = () => {
  const { setDocument } = useJSONPath();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    inputRef.current?.click();
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setDocument(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Button variant="outline" onClick={handleOnClick}>
        Import File
      </Button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onInput={handleOnInput}
        accept="
          .json,
          .jsonl,
          .ndjson,
          .geojson,
          .topojson,
          .jwt,
          .webmanifest,
          .har,
          .mcstructure,
          .eslintrc,
          .prettierrc,
          .babelrc,
          .code-snippets,
          .ipynb,
          .vg,
          .vl,
          .template,
          application/json,
          application/geo+json,
          application/x-ndjson,
          application/jsonlines,
          application/schema+json,
          application/jwt,
          application/feed+json,
          application/vnd.oai.openapi+json,
          application/vnd.swagger+json,
          application/manifest+json,
          application/x-ipynb+json,
        "
      ></input>
    </div>
  );
};

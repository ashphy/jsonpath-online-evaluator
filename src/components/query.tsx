import { useJSONPath } from "@/hooks/use-jsonpath";
import { EngineSelector } from "./engine-selector";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { EngineDescription } from "./engine-description";
import { useEffect, useRef } from "react";

export const Query = () => {
  const { query, setQuery, result } = useJSONPath();

  const queryInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    queryInputRef.current?.focus();
  }, []);

  return (
    <div className="grid w-full items-center">
      <div className="flex gap-2">
        <Label htmlFor="query" className="text-xl text-joe-green-950 w-[180px]">
          JSONPath
        </Label>
        <EngineDescription />
      </div>
      <div className="flex gap-2">
        <EngineSelector />
        <div className="w-full">
          <Input
            ref={queryInputRef}
            id="query"
            type="text"
            placeholder="JSONPath Query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              !result.isValid &&
                "ring-2 ring-destructive focus-visible:ring-2 focus-visible:ring-destructive"
            )}
          />
          <p className="text-destructive h-2 p-1">{result.error}</p>
        </div>
      </div>
    </div>
  );
};

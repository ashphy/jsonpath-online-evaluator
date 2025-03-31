import { Query } from "./query";
import { JSONEditor } from "./editor/json-editor";
import { Result } from "./editor/result";
import { OutputPathSwitch } from "./output-path-switch";
import { useJSONPath } from "@/hooks/use-jsonpath";

export const JSONPathOnlineEvaluator = () => {
  const { outputPaths, setOutputPaths } = useJSONPath();

  return (
    <div className="w-full flex flex-col gap-4">
      <Query />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="py-1 text-xl text-joe-green-950">Document</h2>
          <JSONEditor />
        </div>
        <div>
          <div className="flex justify-between">
            <h2 className="py-1 text-xl text-joe-green-950">
              Evaluation Results
            </h2>
            <OutputPathSwitch checked={outputPaths} onChange={setOutputPaths} />
          </div>
          <Result outputPathMode={outputPaths} />
        </div>
      </div>
    </div>
  );
};

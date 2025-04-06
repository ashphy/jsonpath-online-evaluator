import { Query } from "./query";
import { JSONEditor } from "./editor/json-editor";
import { Result } from "./editor/result";
import { OutputPathSwitch } from "./output-path-switch";
import { useJSONPath } from "@/hooks/use-jsonpath";
import { DownloadButton } from "./download-button";

export const JSONPathOnlineEvaluator = () => {
  const { outputPaths, setOutputPaths } = useJSONPath();

  return (
    <div className="w-full flex flex-col gap-4">
      <Query />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h2 className="py-1 text-xl text-joe-green-950">Document</h2>
          </div>
          <JSONEditor />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <h2 className="py-1 text-xl text-joe-green-950">
              Evaluation Results
            </h2>
            <div className="flex items-center gap-2">
              <OutputPathSwitch
                checked={outputPaths}
                onChange={setOutputPaths}
              />
            </div>
          </div>
          <div className="relative">
            <Result outputPathMode={outputPaths} />
            <DownloadButton className="absolute bottom-2 right-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

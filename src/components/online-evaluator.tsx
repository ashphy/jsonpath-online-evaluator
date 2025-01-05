import { Query } from "./query";
import { JSONEditor } from "./editor/json-editor";
import { Result } from "./editor/result";

export const JSONPathOnlineEvaluator = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Query />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="py-1 text-xl text-joe-green-950">Document</h2>
          <JSONEditor />
        </div>
        <div>
          <h2 className="py-1 text-xl text-joe-green-950">
            Evaluation Results
          </h2>
          <Result />
        </div>
      </div>
    </div>
  );
};

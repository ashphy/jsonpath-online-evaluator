import { SiGithub } from "@icons-pack/react-simple-icons";
import { ShareButton } from "./share-button";
import { ResetButton } from "./reset-button";

export const AppTitle = () => {
  return (
    <div
      className="
        w-full h-full px-4 flex items-center justify-between
        bg-linear-to-r from-joe-green-600 to-emerald-600"
    >
      <h1 className="py-2 text-3xl text-white">JSONPath Online Evaluator</h1>
      <div className="justify-self-end flex gap-1 items-center">
        <ResetButton />
        <ShareButton />
        <div className="pl-2">
          <a
            href="https://github.com/ashphy/jsonpath-online-evaluator"
            target="_blank"
            className="hover:underline"
          >
            <SiGithub
              color="white"
              title="View source code on GitHub: ashphy/jsonpath-online-evaluator"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

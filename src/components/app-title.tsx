import { SiGithub } from "@icons-pack/react-simple-icons";

export const AppTitle = () => {
  return (
    <div
      className="
        w-full h-full px-4 flex items-center justify-between
        bg-gradient-to-r from-joe-green-600 to-emerald-600"
    >
      <h1 className="py-2 text-3xl text-white">
        JSONPath Online Evaluator
        {/* <small className="text-xl font-normal text-slate-100">
          {" "}
          - jsonpath.com
        </small> */}
      </h1>
      <div className="justify-self-end">
        <a
          href="https://github.com/ashphy/jsonpath-online-evaluator"
          target="_blank"
          className="inline-flex items-center gap-1 hover:underline"
        >
          <SiGithub
            color="white"
            title="View source code on GitHub: ashphy/jsonpath-online-evaluator"
          />
        </a>
      </div>
    </div>
  );
};

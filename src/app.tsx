import { AppTitle } from "./components/app-title";
import { Footer } from "./components/footer/footer";
import { JSONPathOnlineEvaluator } from "./components/online-evaluator";

const App = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <header className="w-full h-16 flex flex-row items-center self-start">
        <AppTitle />
      </header>
      <div className="max-w-6xl w-full px-4">
        <JSONPathOnlineEvaluator />
      </div>
      <Footer />
    </div>
  );
};

export default App;

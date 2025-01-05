import { useJSONPath } from "@/hooks/use-jsonpath";
import { engines, parseEngine } from "@/types/engine";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const EngineSelector = () => {
  const { engine, setEngine } = useJSONPath();

  return (
    <div>
      <Select
        value={engine}
        aria-label="Select the JSONPath parser"
        onValueChange={(currentValue) => {
          const newEngine = parseEngine(currentValue);
          if (newEngine) {
            setEngine(newEngine);
          }
        }}
      >
        <SelectTrigger className="w-[180px] h-12">
          <SelectValue placeholder="JSONPath Parser" />
        </SelectTrigger>
        <SelectContent>
          {engines.map((engine) => (
            <SelectItem key={engine.value} value={engine.value}>
              {engine.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

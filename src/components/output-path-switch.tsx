import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Props {
  onChange?: (pathOutput: boolean) => void;
}

export const OutputPathSwitch = ({ onChange }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="output-paths"
        onCheckedChange={(checked) => onChange?.(checked)}
      />
      <Label htmlFor="output-paths">Output Paths</Label>
    </div>
  );
};

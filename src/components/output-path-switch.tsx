import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Props {
  checked?: boolean;
  onChange?: (pathOutput: boolean) => void;
}

export const OutputPathSwitch = ({ checked = false, onChange }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="output-paths"
        checked={checked}
        onCheckedChange={(checked) => onChange?.(checked)}
      />
      <Label htmlFor="output-paths">Output Paths</Label>
    </div>
  );
};

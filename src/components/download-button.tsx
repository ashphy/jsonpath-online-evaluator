import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useJSONPath } from "@/hooks/use-jsonpath";
import { format } from "@formkit/tempo";

export const DownloadButton = ({ className }: { className?: string }) => {
  const { result } = useJSONPath();

  const handleDownload = () => {
    const text = result.isValid ? JSON.stringify(result.values, null, 2) : "[]";
    const blob = new Blob([text], {
      type: "application/json",
    });
    saveAs(
      blob,
      `evaluation_results_${format(new Date(), "YYYYMMDD_HHmmss")}.json`
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn("rounded-full", className)}
            onClick={handleDownload}
          >
            <Download />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download file</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

import { Check, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useJSONPath } from "@/hooks/use-jsonpath";
import { useCopyToClipboard, useInterval } from "usehooks-ts";
import { useState } from "react";

export const ShareButton = () => {
  const { createShareURL } = useJSONPath();
  const [, copy] = useCopyToClipboard();

  const [isShowCopy, setIsShowCopy] = useState(false);

  useInterval(
    () => {
      setIsShowCopy(false);
    },
    isShowCopy ? 2000 : null
  );

  const handleOnShare = async () => {
    setIsShowCopy(true);
    const shareURL = await createShareURL();
    copy(shareURL);
  };

  return (
    <Button
      variant="ghost"
      className="text-white transition-all duration-700"
      onClick={handleOnShare}
    >
      {isShowCopy && (
        <>
          <Check />
          Copied
        </>
      )}
      {!isShowCopy && (
        <>
          <Share2 />
          Share
        </>
      )}
    </Button>
  );
};

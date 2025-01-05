import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  PocketIcon,
  PocketShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

const SHARE_URL = "https://jsonpath.com/";
const SHARE_TITLE = "JSONPath Online Evaluator";

export const Shares = () => {
  return (
    <div className="flex justify-center gap-2">
      <FacebookShareButton url={SHARE_URL} aria-label="Share on Facebook">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        title={SHARE_TITLE}
        url={SHARE_URL}
        related={["ashphy"]}
        aria-label="Share on X.com"
      >
        <XIcon size={32} round />
      </TwitterShareButton>
      <PocketShareButton
        url={SHARE_URL}
        title={SHARE_TITLE}
        aria-label="Share on Pocket"
      >
        <PocketIcon size={32} round />
      </PocketShareButton>
      <HatenaShareButton
        url={SHARE_URL}
        title={SHARE_TITLE}
        windowWidth={660}
        windowHeight={460}
        aria-label="Share on Hatena bookmark"
      >
        <HatenaIcon size={32} round />
      </HatenaShareButton>
    </div>
  );
};

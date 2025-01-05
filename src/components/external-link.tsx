import { SquareArrowOutUpRight } from "lucide-react";

interface Props {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink = ({ href, children }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      className="inline-flex items-center gap-1 hover:underline"
    >
      {children}
      <SquareArrowOutUpRight size="16" />
    </a>
  );
};

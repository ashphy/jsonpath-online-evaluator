import { Shares } from "./shares";

export const Footer = () => {
  return (
    <footer className="flex flex-col p-6 gap-4 justify-center w-11/12 border-t-2">
      <Shares />
      <div className="text-center text-md text-joe-green-950">
        <a
          href="http://ashphy.com/"
          target="_blank"
          className="hover:underline"
        >
          ashphy - Kazuki Hamasaki
        </a>
      </div>
    </footer>
  );
};

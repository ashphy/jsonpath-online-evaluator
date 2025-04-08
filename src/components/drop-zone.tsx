import { Upload } from "lucide-react";
import { ReactNode, useState } from "react";

interface DropZoneProps {
  onDrop?: (file: File) => void;
  children: ReactNode;
}

export const DropZone = ({ onDrop, children }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onDrop?.(file);
    }
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={(e) => {
        setIsDragging(true);
        e.preventDefault();
      }}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      data-drag={isDragging ? "true" : "false"}
      className="relative"
    >
      {children}
      <div
        data-drag={isDragging ? "true" : "false"}
        className="
          invisible  data-[drag=true]:visible opacity-0 data-[drag=true]:opacity-80
          absolute flex w-full h-full top-0 left-0 p-2 bg-white
          transition-opacity duration-200
        "
      >
        <div
          className="
            flex flex-col items-center justify-center gap-4
            w-full h-full
            border-2 border-dashed border-joe-green-600 rounded-lg text-lg
          "
        >
          <div>Drop JSON file here</div>
          <div>
            <Upload />
          </div>
        </div>
      </div>
    </div>
  );
};

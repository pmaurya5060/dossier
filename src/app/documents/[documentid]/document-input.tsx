import { BsCloudCheck } from "react-icons/bs";

export const DocumentInput = () => {
  return (
    <div className="flex gap-4">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <BsCloudCheck className="" />
    </div>
  );
};
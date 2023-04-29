import { FCT } from "@/type/common";

const Tag: FCT = ({ children }) => {
  return (
    <span className="inline-flex py-0.5 px-1 text-gray-950 bg-gray-300 mr-1 rounded text-sm">
      {children}
    </span>
  );
};

export default Tag;

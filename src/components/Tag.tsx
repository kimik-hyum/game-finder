import { FCT } from "@/type/common";

interface Props {
  color?: string;
  bgColor?: string;
}

const Tag: FCT<Props> = ({
  children,
  color = "text-gray-950",
  bgColor = "bg-gray-300",
}) => {
  const textColor = `${color}`;
  const bgColorClass = `${bgColor}`;
  return (
    <span
      className={`inline-flex py-0.5 px-1 ${textColor} ${bgColorClass} mr-1 rounded text-sm`}
    >
      {children}
    </span>
  );
};

export default Tag;

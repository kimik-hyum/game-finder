import { FCT } from "@/type/common";

const Container: FCT = ({ children }) => {
  return (
    <div className="container">
      <div className="content">{children}</div>
    </div>
  );
};

export default Container;

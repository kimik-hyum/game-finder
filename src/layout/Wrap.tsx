import React, { PropsWithChildren } from "react";
import Aside from "./Aside";
import Container from "./Container";

interface WrapProps extends React.HTMLAttributes<HTMLDivElement> {}

const Wrap: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PropsWithChildren<WrapProps>
> = ({ children, ...props }, ref) => {
  return (
    <div className="pl-60" ref={ref} {...props}>
      <Aside />
      <Container>{children}</Container>
    </div>
  );
};

export default React.forwardRef(Wrap);

import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Container from "./Container";
import clsx from "clsx";

interface WrapProps extends React.HTMLAttributes<HTMLDivElement> {}

const Wrap: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PropsWithChildren<WrapProps>
> = ({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={`${clsx(className)} pt-20`} {...props}>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default React.forwardRef(Wrap);

import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Container from "./Container";
import clsx from "clsx";

interface WrapProps extends React.HTMLAttributes<HTMLDivElement> {
  pageName?: string;
}

const Wrap: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PropsWithChildren<WrapProps>
> = ({ children, className, pageName, ...props }, ref) => {
  return (
    <div ref={ref} className={`${clsx(className)}`} {...props}>
      <Header pageName={pageName} />
      <Container>{children}</Container>
    </div>
  );
};

export default React.forwardRef(Wrap);

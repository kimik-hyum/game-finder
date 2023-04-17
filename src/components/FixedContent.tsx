import { fixedContentState } from "@/store/fixed";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { css } from "@emotion/react";

export default function FixedContent() {
  const [fixed, setFixed] = useRecoilState(fixedContentState);
  const x = fixed?.from.x;
  const y = fixed?.from.y;
  return (
    <div
      className={`fixed left-0 top-0`}
      id="fixed-content"
      css={css`
        transform: translate(${x}px, ${y}px);
      `}
    >
      {fixed?.children.src &&
        (fixed?.children?.type === "video" ? (
          <video src={fixed.children.src} controls />
        ) : (
          <Image src={fixed?.children.src} alt="" width={300} height={300} />
        ))}
    </div>
  );
}

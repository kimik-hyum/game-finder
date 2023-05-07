import { DetailData } from "@/query/app";
import { FCT } from "@/type/common";
import { css } from "@emotion/react";

interface Props {
  detail?: DetailData;
}

const AppDetail: FCT<Props> = ({ detail }) => {
  return (
    <div css={S}>
      <div
        dangerouslySetInnerHTML={{ __html: detail?.detailed_description || "" }}
      />
      {}
    </div>
  );
};
const S = css``;
export default AppDetail;

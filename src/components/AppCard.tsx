import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { mediaMinDesktop } from "@/constants/size";
import { useState } from "react";
import clsx from "clsx";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { useAppDetail, useAppReview } from "@/query/list";
import { useRecoilState } from "recoil";
import { fixedContentState } from "@/store/fixed";

interface Props {
  app_id: number;
  name: string;
  index: number;
}

export default function AppCard({ app_id, name, index }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery(mediaMinDesktop);
  const [fixed, setFixed] = useRecoilState(fixedContentState);
  const [active, setActive] = useState(false);
  const { data } = useAppDetail({
    id: String(app_id),
    enable: active,
  });
  const { data: review } = useAppReview({
    id: String(app_id),
    enable: active,
  });
  const appData = data?.data[app_id]?.data;
  const appReview = review?.data;

  const handleClick = () => {
    if (isDesktop || active) {
      router.push(`/app/${app_id}`);
    }
    if (!isDesktop) {
      setActive(true);
    }
  };

  const handleEnter = () => {
    if (!isDesktop) return false;
    setActive(true);
  };

  const handleLeave = () => {
    if (!isDesktop) return false;
    setActive(false);
  };
  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      css={[
        S,
        `
          z-index: 0;
          &:hover {
            z-index: ${9999 - index};
          }
      `,
      ]}
      data-active={clsx(active && "active")}
    >
      <div className="thumb">
        {appData?.movies?.length > 0 && (
          <div className="absolute top-0 left-0 w-full h-full z-50 overflow-hidden">
            <video
              src={appData.movies[0].webm[480]}
              autoPlay
              loop
              muted
              playsInline
              width={460}
              height={215}
            />
          </div>
        )}
        <Image
          key={app_id}
          src={`https://cdn.akamai.steamstatic.com/steam/apps/${app_id}/header.jpg`}
          alt={name}
          width={460}
          height={215}
        />

        <div className="info">
          <Typography variant="h6" component={"h2"} className="name">
            {name}
          </Typography>
        </div>
      </div>
      <div className="info-card">
        <div className="inner">
          <Typography variant="h6" component={"h2"} className="name">
            {name}
          </Typography>
          <Typography variant="body1" component={"p"}>
            출시일 : {appData?.release_date.date}
          </Typography>
          <Typography variant="body1" component={"p"}>
            평가 : {appReview?.query_summary.review_score_desc}
          </Typography>
          <Typography variant="body1" component={"p"}>
            가격 : {appData?.price_overview?.final_formatted}
          </Typography>
        </div>
      </div>
    </div>
  );
}

const S = css`
  position: relative;
  max-width: 460px;
  width: 100%;
  cursor: pointer;
  transition: z-index 1s cubic-bezier(0.6, 0, 0.6, 0);

  &[data-active="active"] {
    .thumb {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      .info {
        transform: translateY(100%);
      }
    }
    .info-card {
      transform: translateY(210px);
      max-height: 500px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  }

  .thumb {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    z-index: 11;
    .info {
      transition: all 0.6s ease;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .name {
      position: absolute;
      top: 16px;
      left: 16px;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
    }
  }
  .info-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 0;
    background: #fff;
    padding: 12px;
    overflow: hidden;
    transition: all 0.6s ease;
    z-index: 10;
    border-radius: 0 0 8px 8px;

    .inner {
      width: 100%;
    }
  }
`;

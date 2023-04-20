import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { mediaMinDesktop } from "@/constants/size";
import { useRef, useState } from "react";
import clsx from "clsx";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { useAppDetail, useAppReview } from "@/query/list";
import { useRecoilState } from "recoil";
import { fixedContentState } from "@/store/fixed";
import ReactDOM from "react-dom";

interface Props {
  app_id: number;
  name: string;
  index: number;
}

const FixedVideo = ({ container, content }: any) => {
  return ReactDOM.createPortal(<div>123</div>, container);
};

export default function AppCard({ app_id, name, index }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery(mediaMinDesktop);
  const videoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
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

  const handleFixedContent = () => {};

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDesktop || active) {
      //router.push(`/app/${app_id}`, undefined, { shallow: true });
      const videoRect = e.currentTarget?.getBoundingClientRect();
      setFixed({
        children:
          active && !!appData?.movies?.length
            ? {
                src: appData.movies[0].webm[480],
                currentTime: 0,
                type: "video",
              }
            : {
                src: `https://cdn.akamai.steamstatic.com/steam/apps/${app_id}/header.jpg`,
                type: "image",
              },
        from: {
          x: videoRect?.left || 0,
          y: videoRect?.top || 0,
          width: videoRef.current?.clientWidth || 0,
          height: videoRef.current?.clientHeight || 0,
        },
        to: {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
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
    <a
      href="#"
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={cardRef}
      onBlur={() => {
        setActive(false);
      }}
      css={[
        S,
        `
          z-index: 0;
          &[data-active="active"] {
            z-index: ${9999 - index};
            .info-card {
              transform: translateY(${
                (cardRef.current?.clientHeight || 0) - 4
              }px);
            }
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
        <div className="date-text">
          <Typography variant="body2" component={"p"} className="font-bold">
            2022.12.16
          </Typography>
        </div>
        {/* <div className="info">
          <Typography variant="h6" component={"h2"} className="name">
            {name}
          </Typography>
        </div> */}
      </div>
      <div className="info-card">
        <div className="inner flex">
          {/* <Typography
            variant="body1"
            component={"h2"}
            className="name font-bold"
          >
            {name}
          </Typography>
          <Typography variant="body1" component={"p"}>
            출시일 : {appData?.release_date.date}
          </Typography>
          <Typography variant="body1" component={"p"}>
            평가 : {appReview?.query_summary.review_score_desc}
          </Typography> */}
          <Typography variant="body1" component={"span"}>
            16,000원
          </Typography>
          <Typography variant="body1" component={"span"} className="ml-auto">
            👎
          </Typography>
        </div>
      </div>
    </a>
  );
}

const S = css`
  position: relative;
  width: calc(50% - 8px);
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  .date-text {
    position: absolute;
    top: 4px;
    right: 4px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2px 4px;
    border-radius: 4px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
  .info-card {
    flex: 1;
    background-color: #fff;
    border-radius: 0px 0px 4px 4px;
    border: 1px solid #ddd;
    padding: 4px;
  }

  /* position: relative;
  max-width: 460px;
  width: calc(50% - 8px);
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
      //transform: translateY(210px);
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
  } */
`;

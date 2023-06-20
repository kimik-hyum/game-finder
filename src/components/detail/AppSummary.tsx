import { css } from "@emotion/react";
import { Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
const AppSummary = ({ appData }: any) => {
  const {
    header_image,
    genres,
    release_date,
    short_description,
    developers,
    screenshots,
    movies,
    supported_languages,
  } = appData;
  return (
    <div css={summary}>
      <div className="app_summary">
        <div className="img">
          <Image src={header_image} alt="" width={324} height={151} />
        </div>

        <Typography className="short_description" fontSize="xs">
          {short_description}
        </Typography>
        <div className="summary-section">
          <Typography className="infor" fontSize="xs">
            릴리즈 날짜: {release_date.date}
          </Typography>
          <Typography className="infor" fontSize="xs">
            개발사 :{" "}
            <Link
              href={`/?searchType=developers_contains&keyword=${developers}`}
            >
              {developers}
            </Link>
          </Typography>
          <Stack direction="row" spacing={1} className="mt-3">
            {supported_languages &&
              supported_languages
                .replace("<strong>*</strong>음성이 지원되는 언어", "")
                .split(",")
                .map((item: string, i: number) => {
                  return (
                    <Chip
                      key={i}
                      label={item.trim()}
                      color={
                        item.trim().indexOf("한국어") > -1
                          ? "success"
                          : undefined
                      }
                    />
                  );
                })}
          </Stack>

          {supported_languages && supported_languages.indexOf("*") > -1 && (
            <p
              css={css`
                margin-top: 10px;
                font-size: 14px;
              `}
            >
              <strong>*</strong>음성이 지원되는 언어
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const summary = css`
  position: relative;
  display: flex;
  margin-bottom: 40px;
  gap: 0 40px;
  .short_description {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 12px;
  }
  .infor {
    margin-bottom: 4px;
  }
  .app_summary {
    position: relative;
    padding: 20px;
    border-radius: 15px;
    max-width: 364px;
    min-width: 364px;
    border: 1px solid #ddd;
    background: #fff;
    max-height: 460px;
    .img {
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      img {
        width: 324px;
      }
    }
  }
  .movies {
    position: absolute;
    top: 0;
    left: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1920px;
    width: calc(100% - 400px);
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    video {
      min-width: 800px;
    }
  }
`;

export default AppSummary;

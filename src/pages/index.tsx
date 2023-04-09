import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useGetGameList } from "@/query/list";
import { useRecoilState, useSetRecoilState } from "recoil";
import { showFilterState } from "@/store/filter";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const VideoPlayer = ({ src, onVideoClick }: any) => {
  const videoRef: any = useRef();

  return (
    <video
      ref={videoRef}
      onClick={() => onVideoClick(videoRef.current)}
      src={
        "http://cdn.akamai.steamstatic.com/steam/apps/256859750/movie480_vp9.webm?t=1637020101"
      }
      width="640"
      height="360"
      autoPlay
      muted
      playsInline
      controls
    ></video>
  );
};

const DetailedView = ({ container }: any) => {
  return ReactDOM.createPortal(
    <div id="detailed-view-container"></div>,
    container
  );
};

export default function Home() {
  const { data } = useGetGameList();
  const [showFilter, setFilterState] = useRecoilState(showFilterState);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const detailedViewContainerRef: any = useRef(null);

  const onVideoClick = (videoElement: any) => {
    setShowDetailedView(true);
    if (detailedViewContainerRef.current) {
      detailedViewContainerRef.current.appendChild(videoElement);
    }
  };

  useEffect(() => {
    return () => {
      if (detailedViewContainerRef.current) {
        detailedViewContainerRef.current.innerHTML = "";
      }
    };
  }, []);
  return (
    <div>
      <button onClick={() => setFilterState(!showFilter)}>필터보이기</button>
      <div>
        {!showDetailedView && (
          <div>
            <h1>Thumbnail View</h1>
            <VideoPlayer
              src="your-video-source.mp4"
              onVideoClick={onVideoClick}
            />
          </div>
        )}

        {showDetailedView && (
          <div>
            <h1>Detailed View</h1>
            <DetailedView
              container={document.getElementById("detailed-view")}
            />
          </div>
        )}

        <div
          ref={detailedViewContainerRef}
          id="detailed-view"
          style={{ display: showDetailedView ? "block" : "none" }}
        ></div>
      </div>
    </div>
  );
}

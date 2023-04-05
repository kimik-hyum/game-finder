import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useGetGameList } from "@/query/list";
import { useRecoilState, useSetRecoilState } from "recoil";
import { showFilterState } from "@/store/filter";

export default function Home() {
  const { data } = useGetGameList();
  const [showFilter, setFilterState] = useRecoilState(showFilterState);
  return (
    <div>
      <button onClick={() => setFilterState(!showFilter)}>필터보이기</button>
    </div>
  );
}

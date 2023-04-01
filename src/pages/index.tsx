import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useGetGameList } from "@/query/list";

export default function Home() {
  const { data } = useGetGameList();
  return <div></div>;
}

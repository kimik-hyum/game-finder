import PATH from "@/constants/path";
import { Typography } from "@mui/material";
import Link from "next/link";
export default function Header() {
  return (
    <header className="fixed flex w-full h-20 left-0 top-0 px-10 py-4 shadow-md">
      <div className="logo mb-20">
        <Link href="/">
          <Typography variant="h4" className="font-medium text-gray-600">
            GAME FINDER
          </Typography>
        </Link>
      </div>
      <nav className="ml-auto -mr-4">
        <ul className="flex">
          {NAV.map((nav) => (
            <li key={nav.title} className="mb-8">
              <Link href={nav.path} className="px-4 py-2 block">
                <Typography variant="h5">{nav.title}</Typography>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const NAV = [
  {
    title: "최신 게임",
    path: PATH.RECENT,
  },
  {
    title: "인기 게임",
    path: PATH.POPULAR,
  },
  {
    title: "출시 예정 캘린더",
    path: PATH.CALENDAR,
  },
];

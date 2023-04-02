import PATH from "@/constants/path";
import { Typography } from "@mui/material";
import Link from "next/link";
export default function Aside() {
  return (
    <aside className="fixed w-60 h-full left-0 top-0 p-5 shadow-md">
      <div className="logo mb-10">
        <Link href="/">
          <Typography variant="h3" className="font-normal text-gray-600">
            GAME <br />
            FINDER
          </Typography>
        </Link>
      </div>
      <nav>
        <ul>
          {NAV.map((nav) => (
            <li key={nav.title} className="mb-4">
              <Link href={nav.path}>
                <Typography variant="h5">{nav.title}</Typography>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
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
    title: "캘린더",
    path: PATH.CALENDAR,
  },
];

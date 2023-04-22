import PATH from "@/constants/path";
import { Typography } from "@mui/material";
import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky z-10 flex flex-col -top-16  md:flex-row  w-full md:h-20 left-0 md:top-0 md:px-10 pt-4 shadow-md bg-white">
      <div className="logo mb-2 md:mb-20">
        <Link href="/">
          <Typography
            variant="h4"
            className="font-medium text-gray-600 text-center"
          >
            GAME FINDER
          </Typography>
        </Link>
      </div>
      <nav className="flex justify-center items-center max-md:border-t max-md:py-2 md:ml-auto md:-mr-4 ">
        <ul className="flex">
          {NAV.map((nav) => (
            <li key={nav.title} className="md:mb-8">
              <Link href={nav.path} className="px-4 block">
                <Typography variant="h6">{nav.title}</Typography>
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
    title: "출시 예정",
    path: PATH.CALENDAR,
  },
];

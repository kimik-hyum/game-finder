import PATH from "@/constants/path";
import { Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";

interface Props {
  pageName?: string;
}
export default function Header({ pageName }: Props) {
  const router = useRouter();
  return (
    <header
      className={`sticky z-50 flex -top-16  md:flex-row  w-full md:h-20 left-0 md:top-0 md:px-10 shadow-md bg-white flex-col`}
    >
      <div className="title-bar flex justify-center items-center py-4 h-18">
        {!!pageName && (
          <button
            onClick={() => router.back()}
            className="absolute left-6 top-1/2 -translate-y-1/2 "
          >
            <ArrowBackIosIcon className="text-3xl" />
          </button>
        )}
        <div className="logo">
          <Link href="/">
            <Typography
              variant={!pageName ? "h4" : "h5"}
              className="font-medium text-gray-600 text-center"
            >
              {pageName || `GAME FINDER`}
            </Typography>
          </Link>
        </div>
      </div>

      {!pageName && (
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
      )}
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

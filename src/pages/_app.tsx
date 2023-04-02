import { isClient } from "@/constants/common";
import Wrap from "@/layout/Wrap";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { RecoilRoot } from "recoil";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60 * 24,
      },
    },
  });
  const persister = createSyncStoragePersister({
    storage: isClient ? window.localStorage : undefined,
  });
  const theme = createTheme({
    typography: {
      fontFamily: "inherit", // 브라우저 기본 font-family 사용
    },
  });

  return (
    <RecoilRoot>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <ThemeProvider theme={theme}>
          <Wrap className={`${roboto.className}`}>
            <Component {...pageProps} />
          </Wrap>
        </ThemeProvider>
      </PersistQueryClientProvider>
    </RecoilRoot>
  );
}

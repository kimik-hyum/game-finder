import FixedContent from "@/components/FixedContent";
import { isClient } from "@/constants/common";
import Wrap from "@/layout/Wrap";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Hydrate, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const persister = createSyncStoragePersister({
    storage: isClient ? window.localStorage : undefined,
  });
  const theme = createTheme({
    typography: {
      fontFamily: "inherit", // 브라우저 기본 font-family 사용
    },
  });

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <RecoilRoot>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            {/* <FixedContent /> */}
            <div className={`${roboto.className}`}>
              {getLayout(<Component {...pageProps} />)}
            </div>
          </ThemeProvider>
        </Hydrate>
      </PersistQueryClientProvider>
    </RecoilRoot>
  );
}

import { showFilterState } from "@/store/filter";
import { FCT } from "@/type/common";
import { useRecoilState, useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import ContentSpinner from "@/components/ContentSpinner";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router";
const Filter = dynamic(() => import("@/layout/Filter"), {
  loading: () => <ContentSpinner />,
});

const Container: FCT = ({ children }) => {
  const router = useRouter();
  const [showFilter, setFilter] = useRecoilState(showFilterState);
  useEffect(() => {
    setFilter(false);
  }, [router.pathname]);
  return (
    <div className="container max-w-none">
      <AnimatePresence>{showFilter && <Filter />}</AnimatePresence>
      <motion.div
        animate={{
          paddingLeft: showFilter ? "200px" : "0px",
          transition: { duration: 0.4 },
        }}
        className="pl-0"
      >
        <div className="content">{children}</div>
      </motion.div>
    </div>
  );
};

export default Container;

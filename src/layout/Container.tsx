import { showFilterState } from "@/store/filter";
import { FCT } from "@/type/common";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import ContentSpinner from "@/components/COntentSpinner";
import { AnimatePresence, motion } from "framer-motion";
const Filter = dynamic(() => import("@/layout/Filter"), {
  loading: () => <ContentSpinner />,
});

const Container: FCT = ({ children }) => {
  const showFilter = useRecoilValue(showFilterState);
  return (
    <div className="container">
      <AnimatePresence>{showFilter && <Filter />}</AnimatePresence>
      <div className="content">{children}</div>
    </div>
  );
};

export default Container;

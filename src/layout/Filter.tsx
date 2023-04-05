import { Switch, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Filter() {
  return (
    <motion.div
      initial={{ y: 0, x: -200 }}
      animate={{ y: 0, x: 0 }}
      exit={{ y: 0, x: -200 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-20 "
    >
      <div>
        <Typography>한국어 지원 여부:</Typography>
        <Switch />
      </div>
    </motion.div>
  );
}

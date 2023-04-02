import { CircularProgress } from "@mui/material";

export default function ContentSpinner() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50">
      <CircularProgress />
    </div>
  );
}

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const DashboardButton = styled(Button)(() => ({
  backgroundColor: '#FFDCD3',
  padding: "20px",
  margin: "20px",
  color: "#916239",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#fff4e7",
  },
}));

export default DashboardButton
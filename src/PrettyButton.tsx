import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PrettyButton = styled(Button)(() => ({
  backgroundColor: '#472200',
  padding: "10px",
  margin: "10px",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#916239",
  },
}));

export default PrettyButton
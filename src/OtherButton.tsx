import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const OtherButton = styled(Button)(() => ({
  width: "100%",
  backgroundColor: "#472200",
  color: 'white',
  fontWeight: "bold",
  fontFamily: "'Press Start 2P', cursive", 
  textTransform: "none",  
  padding: "5% 3%",
  marginTop: "2%",
  "&:hover": {
    backgroundColor: "#f9ca93",
  },
}));

export default OtherButton
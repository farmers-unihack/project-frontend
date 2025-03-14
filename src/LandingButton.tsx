import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const LandingButton = styled(Button)(() => ({
  width: "33%",
  backgroundColor: "white",
  color: '#472200',
  fontWeight: "bold",
  fontFamily: "'Press Start 2P', cursive", 
  textTransform: "none",  
  marginTop: "30px",
  "&:hover": {
    backgroundColor: "#f9ca93",
  },
}));

export default LandingButton
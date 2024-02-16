import { styled, Box } from "@mui/material";

const FooterBox = styled(Box) `
  padding-left: ${props => props.theme.spacing(0)};
  padding-right: ${props => props.theme.spacing(0)};
  margin-top: auto;
  background-color: ${props => props.theme.palette.primary.light};
  color: ${props => props.theme.palette.getContrastText(props.theme.palette.primary["light"])};
` as typeof Box;

export { FooterBox };
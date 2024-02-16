import { styled, Button } from '@mui/material';

const FormButton = styled(Button) `
  border-radius: ${props => props.theme.shape.borderRadius};
` as typeof Button;

export { FormButton };
/**
 * MUI Button Wrapper.
 */

import Button from "@mui/material/Button";

const ButtonWrapper = ({ children, ...rest }) => {
  return (
    <Button sx={{ margin: 4, borderRadius: 24 }} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonWrapper;

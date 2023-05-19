import { Button } from "@mui/material";
import React, { memo } from "react";

function MyButton({ children, handleClick }) {

  return (
    <Button onClick={handleClick} variant="outlined">
      {children}
    </Button>
  );
}

export default memo(MyButton);

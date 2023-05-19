import { Button } from "@mui/material";
import React, { memo } from "react";

function BtnComp({ handleClick, children }) {
  
  return (
    <>
      <Button onClick={handleClick}>{children}</Button>
    </>
  );
}

export default memo(BtnComp);

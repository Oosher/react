import React from "react";
import OnClickEvent from "./OnClickEvent";

export default function FatherComponentEvent() {
  const handleClick = (text) => {
  
  };

  return (
    <>
      Text from father
      <OnClickEvent handleClick={handleClick} />
    </>
  );
}

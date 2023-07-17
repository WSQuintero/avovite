import React, { useState } from "react";
import {
  
  Button,
  ButtonGroup,
 
} from "@mui/material";
function GroupedButtons() {
  const [counter, setCounter] = useState(1);

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDecrement = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  const displayCounter = counter > 0;

  return (
    <ButtonGroup   aria-label="small outlined button group" sx={{
      height:10,
      width:10
    }}>
      <Button onClick={handleIncrement} >+</Button>
      {displayCounter && <Button disabled>{counter}</Button>}
      {displayCounter && <Button onClick={handleDecrement}>-</Button>}
    </ButtonGroup>
  );
}

export default GroupedButtons;

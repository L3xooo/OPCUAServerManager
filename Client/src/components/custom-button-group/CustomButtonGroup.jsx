import { Button, ButtonGroup } from "react-bootstrap";

import React from "react";

const CustomButtonGroup = (props) => {
  return (
    <ButtonGroup className={`p-${props.size} w-100`} aria-label="Basic example">
      {props.buttons.map((button, index) => {
        return (
          <Button key={index} type="button" variant="dark"
            className={`p-2 border-light ${props.activeFilter === button ? "active" : ""}`}
            onClick={() => props.handleButtonClick(button)}>
            {button}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
  
export default CustomButtonGroup;
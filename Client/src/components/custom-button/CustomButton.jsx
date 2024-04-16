import { Button } from "react-bootstrap";
import React from "react";

const CustomButton = (props) => {
  return (
    <Button className={`p-${props.size} mx-1 d-flex align-items-center justify-content-center`} variant="dark" 
      onClick={(event) => props.handleButtonClick(event, props.id)}>
      {props.buttonIcon ? (<props.buttonIcon/>) : (props.buttonText)}
    </Button>
  );
};
  
export default CustomButton;
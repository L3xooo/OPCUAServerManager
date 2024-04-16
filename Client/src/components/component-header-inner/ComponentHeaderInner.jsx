import React from "react";
import CustomButton from "../custom-button";
import { Card } from "react-bootstrap";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

const ComponentHeaderInner = (props) => {
  return (
    <Card.Header className="p-0 bg-dark d-flex">
      <CustomButton 
        size={2} 
        buttonIcon={props.buttonState ? CaretUpFill : CaretDownFill} 
        handleButtonClick={props.handleToggle} 
        id={props.id}/> 
      <Card.Title className={`p-2 m-0 text-light text-start d-flex justify-content-between ${/\d/.test(props.header) ? "text-dark" : "text-light"}`} as="h6">
        {capitalizeFirstLetter(props.header)}
      </Card.Title>
    </Card.Header>
  );
};   

export default ComponentHeaderInner;
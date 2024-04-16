import React from "react";
import CustomButton from "../../components/custom-button";
import { TrashFill, PlayFill, StopFill } from "react-bootstrap-icons";


const ActionButtonGroup = (props) => {

  return (
    <>
      {props.online ? (                  
        <CustomButton buttonIcon={StopFill} size={props.size} handleButtonClick={props.handleStopServer} id={props.id}/>
      ) : (
        <CustomButton buttonIcon={PlayFill} size={props.size} handleButtonClick={props.handleRunServer} id={props.id}/>
      )}
      <CustomButton buttonIcon={TrashFill} size={props.size} handleButtonClick={props.handleDeleteServer} id={props.id}/>
    </>
  );  
};

export default ActionButtonGroup;
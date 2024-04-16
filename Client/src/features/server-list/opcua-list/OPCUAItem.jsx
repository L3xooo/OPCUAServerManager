import { OPCUA_SERVER_ALERT_MESSAGES } from "../../alert/AlertMessages";
import React, { useState } from "react";
import { deleteServer, runServer, stopServer } from "./OPCUAListAPI";

import { ListGroup } from "react-bootstrap";
import { showAlert } from "../../alert/AlertSlice";
import { showOPCUAServer } from "../../opcua-server/OPCUAServerSlice";
import { useDispatch } from "react-redux";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons"; 
import ActionButtonGroup from "../../../components/action-button-group";

const OPCUAItem = (props) => {

  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleResponse = async (event, fetchFunction, id, successMessage, errorMessage) => {
    event.stopPropagation();
    const response = await fetchFunction(event, id);
    if (!response.message) {
      props.fetchData();
      dispatch(showAlert({showAlert: true, message: successMessage, type: "success", icon: CheckCircleFill}));
    } else {
      dispatch(showAlert({showAlert: true, message: errorMessage, type: "danger", icon: XCircleFill}));
    }
  };

  const handleDeleteServer = async (event, id) => {
    handleResponse(event, deleteServer, id, OPCUA_SERVER_ALERT_MESSAGES.SUCCESS_DELETE, OPCUA_SERVER_ALERT_MESSAGES.ERROR_DELETE);
  }; 
  const handleRunServer = async (event, id) => {
    handleResponse(event, runServer, id, OPCUA_SERVER_ALERT_MESSAGES.SUCCESS_RUN, OPCUA_SERVER_ALERT_MESSAGES.ERROR_RUN);
  };
  const handleStopServer = async (event, id) => {
    handleResponse(event, stopServer, id, OPCUA_SERVER_ALERT_MESSAGES.SUCCESS_STOP, OPCUA_SERVER_ALERT_MESSAGES.ERROR_STOP);
  };
 
  const handleItemClick = () =>{
    dispatch(showOPCUAServer({showServerModal : true, server : props.server}));
  };

  return (
    <ListGroup.Item className="d-flex align-items-center justify-content-between text-start" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleItemClick()}>
      <p className="text-nowrap w-custom-50 m-0 px-2">{props.server.name}</p>
      <div className={` ${isHovered ? "d-flex" : "d-none"} p-0 h-custom-btn`}>
        <ActionButtonGroup
          online={props.server.online}
          size={1}
          id={props.server.id}
          handleStopServer={handleStopServer}
          handleRunServer={handleRunServer}
          handleDeleteServer={handleDeleteServer}
        />
      </div>
    </ListGroup.Item>
  );
};   

export default OPCUAItem;
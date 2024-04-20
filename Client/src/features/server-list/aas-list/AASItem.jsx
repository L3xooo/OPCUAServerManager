import { ListGroup } from "react-bootstrap";
import React, { useState } from "react";
import { selectServer, selectedServerSelector } from "../../aas-server/AASServerSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/custom-button";
import { TrashFill, CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { showAlert } from "../../alert/AlertSlice";
import { AAS_ALERT_MESSAGES } from "../../alert/AlertMessages";
import { deleteServer } from "./AASListAPI";
import { removeUrlEndpoint } from "../../../utils/stringUtils";

const AASItem = (props) => {

  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const selectedServer = useSelector(selectedServerSelector);
  
  const handleItemClick = (server) => {
    dispatch(selectServer({selectedServer : server}));
  };

  const deleteServerFromDb = async (event, url) => {
    props.startLoading();
    const response = await deleteServer(event, url);
    if (selectedServer) {
      if (selectedServer.idShort === props.server.idShort)
        dispatch(selectServer({selectedServer : {}}));
    } 
    if (response) {
      dispatch(showAlert({showAlert: true, message: AAS_ALERT_MESSAGES.SUCCESS_DELETE, type: "success", icon: CheckCircleFill }));
      props.fetchData();
    } else {
      dispatch(showAlert({showAlert: true, message: AAS_ALERT_MESSAGES.ERROR_DELETE, type: "danger", icon: XCircleFill }));
      console.error("Error");
    }
    props.stopLoading();
  };

  return (
    <ListGroup.Item className="d-flex align-items-center justify-content-between"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleItemClick(props.server)}>
      <p className="text-nowrap w-custom-50 m-0 px-2">{props.server.idShort}</p>
      <div className={` ${isHovered ? "d-flex" : "d-none"} p-0 h-custom-btn`}>
        <CustomButton buttonIcon={TrashFill} size={1} handleButtonClick={(event) => deleteServerFromDb(event,removeUrlEndpoint(props.server.endpoints[0].address))}/>
      </div>
    </ListGroup.Item>
  );
};   

export default AASItem;
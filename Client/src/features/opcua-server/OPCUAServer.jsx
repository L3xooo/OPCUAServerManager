import { hideOPCUAServer, showOPCUAServer } from "./OPCUAServerSlice";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../alert/AlertSlice";
import { OPCUA_SERVER_ALERT_MESSAGES } from "../alert/AlertMessages";
import CustomButton from "../../components/custom-button";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { showOPCUAServerSelector } from "./OPCUAServerSlice";
import { runServer, deleteServer, stopServer } from "../server-list/opcua-list/OPCUAListAPI";
import { XCircleFill, CheckCircleFill } from "react-bootstrap-icons";
import getScriptData from "./OPCUAServerAPI";
import ActionButtonGroup from "../../components/action-button-group";
import OPCUAServerBody from "./components/opcua-server-body/OPCUAServerBody";
import { useLoading } from "../../hooks";

const OPCUAServerDetail = (props) => {
  
  const dispatch = useDispatch();
  const renderModal = useSelector(showOPCUAServerSelector);

  const [stats, setStats] = useState(null);
  const [showConsole, setShowConsole] = useState(false);
  const [loading, startLoading, stopLoading] = useLoading();

  useEffect(() => {
    startLoading();
    stopLoading();
  }, []);

  const handleCloseModal = () => {
    dispatch(hideOPCUAServer());
    setShowConsole(false);
  };

  const handleBackendOperation = async (event, id, backendFunction, successMessage, errorMessage) => {
    event.stopPropagation();
    const response = await backendFunction(event, id);
    if (!response.message) {
      dispatch(showAlert({showAlert: true, message: successMessage, type: "success", icon: CheckCircleFill}));
      if (backendFunction != deleteServer) {
        dispatch(showOPCUAServer({showServerModal: true, server: response}));
      } else {
        //console.log("here");
        dispatch(hideOPCUAServer());
      }
      startLoading();
      setShowConsole(false);
      setStats(null);
      props.fetchData();
      stopLoading();
    } else {
      dispatch(showAlert({showAlert: true, message: errorMessage, type: "danger", icon: XCircleFill}));
    }
  }; 

  const handleDeleteServer = async (event, id) => {
    handleBackendOperation(event, id, deleteServer, OPCUA_SERVER_ALERT_MESSAGES.SUCCESS_DELETE, OPCUA_SERVER_ALERT_MESSAGES.ERROR_DELETE);
  }; 
  const handleRunServer = async (event, id) => {
    handleBackendOperation(event, id, runServer, OPCUA_SERVER_ALERT_MESSAGES.SUCCESS_RUN, OPCUA_SERVER_ALERT_MESSAGES.ERROR_RUN);
  };
  const handleStopServer = async (event, id) => {
    handleBackendOperation(event, id, stopServer, OPCUA_SERVER_ALERT_MESSAGES.SUCCESS_STOP, OPCUA_SERVER_ALERT_MESSAGES.ERROR_STOP);
  };

  const executeScript = async (event, id) => {
    setShowConsole(true);
    const response = await getScriptData(event, id);
    setStats(response);
  };

  return (
    <>
      {renderModal.showServerModal && (
        <Modal show={renderModal.showServerModal} onHide={handleCloseModal} centered>
          <Modal.Header className="bg-dark text-light">
            <Modal.Title>OPCUA Server Detail</Modal.Title>
          </Modal.Header>
          <OPCUAServerBody
            loading={loading}
            data={renderModal.server}
            stats={stats}
            showConsole={showConsole}
          />
          <Modal.Footer className="d-flex justify-content-between">
            <div className="d-flex">
              <ActionButtonGroup
                size={2}
                handleRunServer={handleRunServer}
                handleDeleteServer={handleDeleteServer}
                handleStopServer={handleStopServer}
                id={renderModal.server.id}
                online={renderModal.server.online}
              />
            </div>
            <div className="d-flex">
              <CustomButton size={2} buttonText="Close" handleButtonClick={handleCloseModal}/>
              {renderModal.server.online && (
                <CustomButton size={2} buttonText="Execute Script" handleButtonClick={executeScript} id={renderModal.server.id}/>
              )}
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );  
};

export default OPCUAServerDetail;
import { ListGroup, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import AASItem from "./AASItem";
import Loading from "../../../components/loading";
import MessageInfo from "../../../components/message-info";
import useLoading from "../../../hooks/useLoading";
import { getServers } from "./AASListAPI";
import useFilter from "../../../hooks/useFilter";
import { CheckCircleFill, PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { showAlert } from "../../alert/AlertSlice";
import { AAS_ALERT_MESSAGES } from "../../alert/AlertMessages";
import { checkFileValidExtenstion } from "../../../utils/fileUtils";
import { addServer } from "./AASListAPI";
import CustomButton from "../../../components/custom-button";

const AASList = (props) => {

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, startLoading, stopLoading] = useLoading();
  const filteredServers = useFilter(data, props.searchItem, "idShort");

  useEffect(() => {
    startLoading();
    fetchData();
  }, []);

  const fetchData = async () => {
    startLoading();
    const response = await getServers();
    if (response) {
      stopLoading();
      setData(response);
    } 
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleAddServer = async (event, file) => {
    if (!checkFileValidExtenstion(file,"aasx")) {
      dispatch(showAlert({showAlert: true, message: AAS_ALERT_MESSAGES.ERROR_FILE, type: "danger", icon: XCircleFill }));
      return;
    }
    const formData = new FormData();
    formData.append("someKey" , file);
    startLoading();
    const response = await addServer(formData);
    if (response.ok) {
      dispatch(showAlert({showAlert: true, message: AAS_ALERT_MESSAGES.SUCCESS_IMPORT, type: "success", icon: CheckCircleFill }));
      fetchData();  
      stopLoading();
    } else {
      fetchData();
      stopLoading();
      dispatch(showAlert({showAlert: true, message: AAS_ALERT_MESSAGES.ERROR_IMPORT, type: "danger", icon: XCircleFill }));
    }
  };

  return (
    <>
      <div className="d-flex align-center justify-content-between">
        <Form.Group controlId="formFile" onChange={handleFileChange}>
          <Form.Control type="file" />
        </Form.Group>
        <CustomButton size={1} buttonIcon={PlusCircleFill}  handleButtonClick={(event) => handleAddServer(event, selectedFile)}/>
        {/*         <Button onClick={() => handleAddServer(selectedFile)}/> */} 
      </div>
      {loading ? (
        <Loading/>
      ) : error ? (
        <MessageInfo message={error}/>
      ) : (
        filteredServers.length === 0 ? (
          <MessageInfo message={"No AAS Servers Available"}/>
        ) : (
          <ListGroup className="pt-2">
            {filteredServers.map((server) => (
              <AASItem key={server.idShort} server={server} fetchData={fetchData} startLoading={startLoading} stopLoading={stopLoading}/>
            ))}
          </ListGroup>
        )
      )}
    </>
  );
};

export default AASList;
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectedServerSelector } from "../aas-server/AASServerSlice";
import { showAlert } from "../alert/AlertSlice";
import ComponentHeader from "../../components/component-header";
import { getSubmodelById, getSubmodels, addServer } from "./AASSubmodelAPI";
import ComponentBody from "../../components/component-body/ComponentBody";
import {
  InfoCircleFill,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";
import { useToggle, useLoading } from "../../hooks";
import { AAS_ALERT_MESSAGES } from "../alert/AlertMessages";

const AASSubmodel = () => {
  const dispatch = useDispatch();
  const selectedServer = useSelector(selectedServerSelector);
  const [data, setData] = useState(null);
  const [loading, startLoading, stopLoading] = useLoading();
  const [headerStates, toggleHeaderStates] = useToggle();

  useEffect(() => {
    startLoading();
    if (selectedServer) {
      if (Object.keys(selectedServer).length === 0) {
        setData({});
        return;
      }
      fetchData(selectedServer.endpoints[0].address);
    }
  }, [selectedServer]);

  useEffect(() => {
    if (data) stopLoading();
  }, [data]);

  const fetchData = async (serverEndpoint) => {
    const parsedData = {};
    const response = await getSubmodels(serverEndpoint);
    await Promise.all(
      response.map(async (item) => {
        const keyValue = await getSubmodelById(
          serverEndpoint,
          item.idShort
        );
        parsedData[item.idShort] = keyValue;
      })
    );
    setData(parsedData);
  };

  const handleServerDownload = async (e, data, url) => {
    const response = await addServer(e, data, url);
    if (response.ok) {
      dispatch(
        showAlert({
          show: true,
          message: AAS_ALERT_MESSAGES.SUCCESS_DOWNLOAD,
          type: "success",
          icon: CheckCircleFill,
        })
      );
    } else {
      if (response.status == 409) {
        dispatch(
          showAlert({
            show: true,
            message: AAS_ALERT_MESSAGES.INFO_DOWNLOAD,
            type: "info",
            icon: InfoCircleFill,
          })
        );

        console.error("SA");
      } else
        dispatch(
          showAlert({
            show: true,
            message: AAS_ALERT_MESSAGES.ERROR_DOWNLOAD,
            type: "danger",
            icon: XCircleFill,
          })
        );
    }
  };

  return (
    <Card className="text-center border-0 shadow">
      <ComponentHeader header={"AAS Server Submodels"} />
      <Card.Body className="vh-75 custom-scroll bg-white pb-2">
        {selectedServer === null ? null : (
          <ComponentBody
            data={data}
            loading={loading}
            handleToggle={toggleHeaderStates}
            handleAdd={handleServerDownload}
            elementStates={headerStates}
            idShort={selectedServer.idShort}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default AASSubmodel;

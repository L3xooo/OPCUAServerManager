import { Card } from "react-bootstrap";
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectedServerSelector } from "./AASServerSlice";
import ComponentBody from "../../components/component-body";
import ComponentHeader from "../../components/component-header";
import {useToggle, useLoading} from "../../hooks";

const AASServer = () => {

  const data = useSelector(selectedServerSelector);

  const [loading, startLoading, stopLoading] = useLoading();
  const [headerStates, toggleHeaderStates] = useToggle();

  useEffect(() => {
    startLoading();
  }, []);

  useEffect(() => {
    if (data)
      stopLoading();
  }, [data]);

  return (
    <Card className="text-center border-0 shadow">
      <ComponentHeader header={"AAS Server Detail"}/>
      <Card.Body className="vh-75 custom-scroll bg-white pb-2">
        {data === null ? (
          null
        ) : (
          <ComponentBody
            data={data}
            loading={loading}
            handleToggle={toggleHeaderStates}
            elementStates={headerStates}
            idShort={data.idShort}
          />
        )}
      </Card.Body>
    </Card>
  );
};   

export default AASServer;
import React from "react";
import { Modal } from "react-bootstrap";
import Loading from "../../../../components/loading";
import ScriptConsole from "../script-console";
import InputGroupData from "../../../../components/input-group-data";

const OPCUAServerBody = (props) => {

  //console.log(props.data);
  //console.log(props.loading);
  return (
    <Modal.Body>
      {props.loading ? (
        <Loading/>
      ) : (
        <>
          {Object.entries(props.data).slice(1).map(([key, value], index) => (
            <InputGroupData
              key={index}
              name={key}
              value={value}
            />
          ))}
          <ScriptConsole data={props.stats} showConsole={props.showConsole}/>
        </>
      )}
    </Modal.Body>
  );
};

export default OPCUAServerBody;
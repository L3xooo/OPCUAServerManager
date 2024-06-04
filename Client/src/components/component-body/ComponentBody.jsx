import React, { useEffect, useState } from "react";
import Loading from "../loading";
import InputGroupData from "../input-group-data";
import { Card, Collapse, Button } from "react-bootstrap";
import ComponentHeaderInner from "../component-header-inner";

const ComponentBody = (props) => {  

  const [semantics, setSemantics] = useState();


  useEffect(() => {
    if (props.data) {
      var semantics = {};
      const submodels = Object.keys(props.data);
      submodels.forEach((submodel) => {
        if (props.data[submodel].semanticId)
          semantics[submodel] = props.data[submodel].semanticId;
      });
      setSemantics(semantics);
    }
  }, [props.data]);

  const checkSemantic = (semanticId, key) => {
    for (const [fieldKey, value] of Object.entries(semantics)) {
      if (key.includes(fieldKey) && value == semanticId) {
        return true;
      }
    }
    return false;
  };  


  const renderComponentData = (data, parentKey = "") => {
    return Object.entries(data).map(([key, value]) => {
      const id = parentKey + "." + key;
      if (Array.isArray(value) && value.length == 0 || key == "submodels")
        return;
      if (key === "semanticId") 
        return;
      return typeof value === "object" && value !== "string" ? (
        <Card className="mb-2" key={id} >
          <ComponentHeaderInner
            handleToggle={props.handleToggle}
            header={key}
            id={id}
            buttonState={props.elementStates[id]}/>
          <Collapse in={props.elementStates[id]} key={id}>
            <Card.Body className=" bg-light pb-0">
              {renderComponentData(value, id)}
            </Card.Body>
          </Collapse>
        </Card>
      ) : (
        <div key={id}>
          <InputGroupData key={id} name={key} value={value}/>
          {key === "BinaryExecutable" ? (
            checkSemantic("https://phi-ware.com/DTFF40/AdhocFunctionality/1/1", id) ? 
              <div className="d-flex justify-content-end pb-2">
                <Button 
                  variant="dark" 
                  onClick={(event) => props.handleAdd(event, {
                    name: "OPCUA-" + props.idShort,
                    fileName: props.idShort + ".zip",
                    online: false,
                    url: value
                  }, value)}> Download
                </Button>
              </div> : null
          ) : null}
        </div>   
      );
    });
  };
      
  return (
    props.loading ? <Loading/> : props.data ? renderComponentData(props.data, props.idShort) : null
  );
};

export default ComponentBody;
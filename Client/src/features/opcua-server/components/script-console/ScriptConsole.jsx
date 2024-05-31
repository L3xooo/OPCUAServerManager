import React from "react";
import { Col, Card, Row, Collapse } from "react-bootstrap";
import Loading from "../../../../components/loading";

const ScriptConsole = (props) => {
  //console.log(props);
  return (
    <Collapse in={props.showConsole}>
      <Card bg="dark" className="text-light">
        <Card.Body >
          <Row>
            {props.data ? (
              Object.entries(props.data).map(([key, value], index) => {
                return (
                  <Col key={index} className="text-center">
                    <div>
                      <strong>{key}</strong>
                    </div>
                    <div className="">
                      {value}
                    </div>
                  </Col>
                );
              })
            ) : (
              <Loading text={"Executing script, please wait."}/>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Collapse>
  );
};

export default ScriptConsole;
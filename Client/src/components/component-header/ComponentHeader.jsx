import React from "react";
import { Card } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

const ComponentHeader = (props) => {
  return (
    <Card.Header className="p-0 bg-dark">
      <Card.Title className="p-3 m-0 text-light" as="h5">{capitalizeFirstLetter(props.header)}</Card.Title>
    </Card.Header>
  );
};

export default ComponentHeader;
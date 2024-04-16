import { Form, InputGroup } from "react-bootstrap";

import React from "react";

const InputGroupData = (props) => {

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text className="w-custom-100">
        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      </InputGroup.Text>
      <Form.Control
        placeholder={props.name}
        aria-label={props.name}
        value={props.value}
        disabled={true}
      />
    </InputGroup>  
  );
};

export default InputGroupData;

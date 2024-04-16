import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center p-2">
      <Spinner animation="border" role="status"/>
      <span className="sr-only px-2">
        {props.text ? (props.text) : ("Loading...")}
      </span>
    </div>
  ); 
};   

export default Loading;
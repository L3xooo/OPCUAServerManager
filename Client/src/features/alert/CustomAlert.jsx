import { Alert } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert, showAlertSelector } from "./AlertSlice";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

const CustomAlert = () => {

  const dispatch = useDispatch();
  const renderAlert = useSelector(showAlertSelector);

  useEffect(() => {
    if (renderAlert.showAlert)
      setTimeout(() => {
        dispatch(hideAlert({}));
      }, 2000);
  }, [renderAlert]);

  return (
    <Alert show={renderAlert.showAlert} variant={renderAlert.type} className="position-absolute z-3 start-50 translate-middle">
      <Alert.Heading className="d-flex align-items-center">
        <renderAlert.icon/>
        <div className="px-2">
          {capitalizeFirstLetter(renderAlert.type)} Alert
        </div>
      </Alert.Heading>
      <p className="m-0">
        {renderAlert.message}
      </p>
    </Alert>
  );
};

export default CustomAlert;
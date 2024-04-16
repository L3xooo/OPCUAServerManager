import React from "react";
import CustomAlert from "../features/alert/CustomAlert";
import AASServer from "../features/aas-server";
import AASSubmodel from "../features/aas-submodel"; 
import ServerList from "../features/server-list";

const Home = () => {
  return (
    <div className="container-fluid">
      <CustomAlert/>
      <div className="row">
        <div className="col-md-2"> 
          <ServerList/>
        </div>
        <div className="col-md-5">
          <AASSubmodel/>
        </div>
        <div className="col-md-5">
          <AASServer/>
        </div>
      </div>   
    </div>
  );
};

export default Home;

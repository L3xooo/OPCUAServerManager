import React, { useEffect, useState } from "react";

import CustomButtonGroup from "../../../components/custom-button-group";
import { ListGroup } from "react-bootstrap";
import Loading from "../../../components/loading";
import MessageInfo from "../../../components/message-info";
import OPCUAItem from "./OPCUAItem";
import OPCUAServer from "../../opcua-server/OPCUAServer";
import { getServers } from "./OPCUAListAPI";
import { useLoading } from "../../../hooks";
import useFilter from "../../../hooks/useFilter";

const OPCUAServerList = (props) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Servers");
  const [loading, startLoading, stopLoading] = useLoading();
  const filteredServers = useFilter(data, props.searchItem, "name", "online", activeFilter);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () =>{
    startLoading();
    const response = await getServers();
    if (response) {
      stopLoading();
      setData(response);
    }
  };

  const handleFilterButton = (filter) => {
    startLoading();
    setActiveFilter(filter);
    stopLoading();
  };

  return (
    <>
      <CustomButtonGroup buttons={["All Servers", "Online", "Offline"]} activeFilter={activeFilter} handleButtonClick={handleFilterButton} size={0}/>
      {loading ? (
        <Loading/>
      ) : error ? (
        <MessageInfo message={error}/>
      ) : (
        filteredServers.length === 0 ? (
          <MessageInfo message={"No Available OPC UA Servers"}/>
        ) : (
          <ListGroup className="pt-2">
            {filteredServers.map((server, index) => (
              <OPCUAItem
                key={index}
                server={server}
                fetchData={fetchData}/>
            ))}
          </ListGroup>
        )
      )}
      <OPCUAServer fetchData={fetchData}/>
    </>
  );  
};

export default OPCUAServerList;
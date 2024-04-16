import { Card, Nav } from "react-bootstrap";
import React, { useState } from "react";

import AASList from "./aas-list/AASList";
import CustomButtonGroup from "../../components/custom-button-group";
import OPCUAList from "./opcua-list/OPCUAList";
import SearchForm from "../../components/search-form/SearchForm";
import ComponentHeader from "../../components/component-header/ComponentHeader";

const ServerList = () => {
  const [activeList, setActiveList] = useState("AAS Servers");
  const [searchItem, setSearchItem] = useState("");

  const handleButtonClick = (value) => {
    setActiveList(value);
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    console.log(userInput);
    setSearchItem(userInput);
  };

  return (
    <Card className="text-center shadow">
      <ComponentHeader header={activeList} />
      <Card.Body className="vh-75 custom-scroll bg-white pt-0" >
        <Nav
          variant="tabs"
          defaultActiveKey="AllButton"
          className="border-0"
        >
          <CustomButtonGroup
            buttons={["AAS Servers", "OPCUA Servers"]}
            handleButtonClick={handleButtonClick}
            activeFilter={activeList}
            size={2}
          />
          <div className="d-flex align-items-center pb-2">
            <SearchForm
              searchItem={searchItem}
              handleInputChange={handleInputChange}
            />
          </div>
        </Nav>
        {activeList == "AAS Servers" ? (
          <AASList searchItem={searchItem} />
        ) : (
          <OPCUAList searchItem={searchItem} />
        )}
      </Card.Body>
    </Card>
  );
};

export default ServerList;

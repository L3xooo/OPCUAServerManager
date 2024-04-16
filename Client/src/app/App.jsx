import React from "react";
import Home from "../pages/Home";
import Footer from "../components/footer";
import "../style/style.css";
import NavMenu from "../components/navmenu";

const App =() => {

  return (
    
    <div className="bg-light">
      <NavMenu name = "OPCUA Server Manager"/>
      <Home/>    
      <Footer />
    </div>
  );
};


export default App;
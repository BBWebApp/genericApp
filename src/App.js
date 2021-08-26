import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import GenericManager from "./components/GenericManager";
import { useSelector, useDispatch } from "react-redux";
import { getXML, getGenericApp } from "./redux/ducks/serverCall";

/* 
lcp --proxyUrl http://192.168.178.36:5002 --port 8011
 */

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getXML());
  }, []);

  var Xml = useSelector((state) => {
    return state.serverCall.xml;
  });

  return Xml ? (
    <BrowserRouter>
      {/* {isAuthenticated === false && <LoginButton />} */}

      {/* {isAuthenticated === true && ( */}
      <React.Fragment>
        <GenericManager appXml={Xml} />
      </React.Fragment>

      {/* )} */}
    </BrowserRouter>
  ) : (
    <div>404 XML not found</div>
  );
}

export default App;

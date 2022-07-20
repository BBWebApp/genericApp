import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import GenericManager from "./components/GenericManager";
import { useSelector, useDispatch } from "react-redux";
import { getXML, getGenericApp } from "./redux/ducks/serverCall";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "./redux/ducks/downloadImage";

/* 
lcp --proxyUrl http://192.168.178.36:5002 --port 8011
 */

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getXML());

    dispatch(getDownloadedImages(true));

    dispatch(getDownloadedImages());
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
    <Box
      style={{ justifyContent: "center", alignItems: "center" }}
      sx={{ display: "flex" }}
    >
      {/* Loading... */}
      <CircularProgress />
    </Box>
  );
}

export default App;

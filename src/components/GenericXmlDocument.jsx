import { makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { deepFind } from "react-children-utilities";
import ReactDOMServer from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";

const useStyles = makeStyles({});
const GenericXmlDocument = (props) => {
  const { xml } = props;
  return <div> {xml} </div>;
};

export default GenericXmlDocument;

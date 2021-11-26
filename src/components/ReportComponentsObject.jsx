import { makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { deepFind } from "react-children-utilities";
import ReactDOMServer from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { stockData } from "./data";
const useStyles = makeStyles({});
const ReportComponentsObject = (props) => {
  const { reportId } = props;
  const { xmlResult } = props;
  var components =
    xmlResult[0].length === undefined ? [xmlResult[0]] : xmlResult[0];

  var componentArray = [];
  var reportProperties = {};

  Object.keys(components).map(function (key, index) {
    componentArray.push(index + 1 + "_" + components[key].$.type);
  });
  reportProperties[reportId] = componentArray;

  return (
    <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
      {" "}
      {`"${JSON.stringify(reportProperties, null, 2).toString()}"`}
    </pre>
  );
};

export default ReportComponentsObject;

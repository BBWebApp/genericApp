import React, { useEffect, useState } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import ReportComponentTable from "./ReportComponentTable";
import ReportComponentText from "./ReportComponentText";
import ReportComponentChart from "./ReportComponentChart";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  report_content: {
    width: "100%",
    marginLeft: "10px",
    marginRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    minHeight: "720px",
    display: "block",
    backgroundColor: "white",
    overflow: "hidden",
  },
});

const ReportTemplateContent = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;
  const classes = useStyles();

  var components =
    xmlResult[0].length === undefined ? [xmlResult[0]] : xmlResult[0];
  return (
    xmlResult !== undefined && (
      <div className={classes.report_content}>
        {components.map((item, index) => {
          return item.$.type === "table" ? (
            <ReportComponentTable
              key={reportId}
              xmlResult={item}
              order={index}
            />
          ) : item.$.type === "text" ? (
            <ReportComponentText
              key={reportId}
              reportId={reportId}
              xmlResult={item}
              order={index}
            />
          ) : item.$.type === "chart" ? (
            <ReportComponentChart
              key={reportId}
              reportId={reportId}
              xmlResult={item}
              order={index}
            />
          ) : (
            <div>WTFFF</div>
          );
        })}
      </div>
    )
  );
};

export default ReportTemplateContent;

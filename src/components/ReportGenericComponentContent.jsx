import React, { useEffect, useState } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import ReportGenericComponentTable from "./ReportGenericComponentTable";
import ReportGenericComponentText from "./ReportGenericComponentText";
import ReportGenericComponentChart from "./ReportGenericComponentChart";
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
  const { inverse } = props;
  const classes = useStyles();

  var components =
    xmlResult[0].length === undefined ? [xmlResult[0]] : xmlResult[0];

  var targetComponent = props.component;
  var componentOrder =
    targetComponent !== undefined ? targetComponent.split("_")[0] : undefined;
  var componentType =
    targetComponent != undefined ? targetComponent.split("_")[1] : undefined;

  const RerportContentComponentOrFull = (Iscomponents) => {
    return Iscomponents ? (
      <div className={classes.report_content}>
        {components.map((item, index) => {
          return item.$.type === "table" &&
            item.$.type === componentType &&
            index + 1 + "" === componentOrder ? (
            <ReportGenericComponentTable
              key={reportId}
              xmlResult={item}
              order={index}
              inverse = {inverse}
            />
          ) : item.$.type === "text" &&
            item.$.type === componentType &&
            index + 1 + "" === componentOrder ? (
            <ReportGenericComponentText
              key={reportId}
              reportId={reportId}
              xmlResult={item}
              order={index}
            />
          ) : item.$.type === "chart" &&
            item.$.type === componentType &&
            index + 1 + "" === componentOrder ? (
            <ReportGenericComponentChart
              key={reportId}
              reportId={reportId}
              xmlResult={item}
              order={index}
            />
          ) : (
            <div></div>
          );
        })}
      </div>
    ) : (
      <div className={classes.report_content}>
        {components.map((item, index) => {
          return item.$.type === "table" ? (
            <ReportGenericComponentTable
              key={reportId}
              xmlResult={item}
              order={index}
            />
          ) : item.$.type === "text" ? (
            <ReportGenericComponentText
              key={reportId}
              reportId={reportId}
              xmlResult={item}
              order={index}
            />
          ) : item.$.type === "chart" ? (
            <ReportGenericComponentChart
              key={reportId}
              reportId={reportId}
              xmlResult={item}
              order={index}
            />
          ) : (
            <div>noReport</div>
          );
        })}
      </div>
    );
  };
  return (
    xmlResult !== undefined && (
      <div>
        {RerportContentComponentOrFull(
          componentOrder === undefined ? false : true
        )}
      </div>
    )
  );
};

export default ReportTemplateContent;

import { makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { deepFind } from "react-children-utilities";
import ReactDOMServer from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";

const useStyles = makeStyles({});
var allScreenShots = [];
const dashboardXmlContents = (screenShots) => {
  allScreenShots = [];
  screenShots.map((item) => {
    allScreenShots.push(
      ` <dashboardItem reportUrl=${item["reportUrl"].substring(1)} date=${
        item["date"]
      } firstComponent=${item["reportElement"]} />`
    );
  });
};
const DashboardRecentlyXmlDocument = (props) => {
  var screenShots = useSelector((state) => {
    return state.downloadImage.images;
  }); // state.reducer.stateName

  screenShots != undefined && dashboardXmlContents(screenShots);
  console.log(screenShots);
  return (
    screenShots != undefined && (
      <div>
        {
          
        }
        {`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <dashboard>
        <recentlyUsed>
           <Items>
          ${allScreenShots.join(" ")}
           </Items>
        </recentlyUsed>
    </dashboard>`}
        ;
      </div>
    )
  );
};

export default DashboardRecentlyXmlDocument;

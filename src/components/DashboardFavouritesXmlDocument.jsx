import { makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { deepFind } from "react-children-utilities";
import ReactDOMServer from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";

const useStyles = makeStyles({});
function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}
var allScreenShots = [];
var componentsWithImages = undefined;
const componentsContents = (xml, componentsWithImages) => {
  if (isString(xml)) return;

  Object.keys(xml).map((key) => {
    switch (key) {
      case "$":
        if (xml[key]["type"] === "chart") {
          var chartImage = xml["chartImage"]["$"]["img"];
          componentsWithImages[xml[key]["link"]] = chartImage;
        }
        break;
      default:
        var reports = new Array();
        reports = xml[key];
        Object.keys(reports).map((reportKey) => {
          componentsContents(reports[reportKey], componentsWithImages);
        });
        break;
    }
  });
};

const dashboardXmlContents = (screenShots, componentsWithImages) => {
  allScreenShots = [];
  screenShots.map((item) => {
    var imgData = componentsWithImages[item["reportUrl"].substring(1)];
    allScreenShots.push(
      `<FavouritesItem reportUrl=${item["reportUrl"].substring(1)} date=${
        item["date"]
      } img = ${imgData !== undefined ? imgData : "none"} firstComponent=${
        item["reportElement"]
      }/>`
    );
  });
};
const DashboardFavouritesXmlDocument = ({ contentStructure }) => {
  var screenShots = useSelector((state) => {
    return state.downloadImage.favs;
  }); // state.reducer.stateName

  componentsWithImages = {};
  componentsContents(contentStructure, componentsWithImages);
  screenShots !== undefined &&
    dashboardXmlContents(screenShots, componentsWithImages);

  return (
    screenShots != undefined &&
    allScreenShots.length !== 0 && (
      <div>
        {`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <dashboard>
        <favourites>
           <Items>
          ${allScreenShots.join(" ")}
           </Items>
        </favourites>
    </dashboard>`}
        ;
      </div>
    )
  );
};

export default DashboardFavouritesXmlDocument;

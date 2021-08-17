import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
// import Header from "@bit/bbconsult.standalone-components.wm-components.header";
// import Drawer from "@bit/bbconsult.standalone-components.wm-components.drawer";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import GenericXmlDocument from "./GenericXmlDocument";
import ContentsController from "./ContentsController";
import { Redirect, Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";
const useStyles = makeStyles({});

var parseString = require("xml2js").parseString;
var stripNS = require("xml2js").processors.stripPrefix;

const options = {
  tagNameProcessors: [stripNS],
  explicitArray: false,
};
const traversePackageTree = (packageExplorer, drawerObj) => {
  var packageCateogryReportName;
  Object.keys(packageExplorer).map((packageItemsOrCategories) => {
    switch (packageItemsOrCategories) {
      case "$":
        packageCateogryReportName =
          packageExplorer[packageItemsOrCategories].name;
        drawerObj[packageCateogryReportName] = new Array();
        break;
      case "item":
        var itemLists =
          packageExplorer[packageItemsOrCategories].length === undefined
            ? [packageExplorer[packageItemsOrCategories]]
            : packageExplorer[packageItemsOrCategories];

        drawerObj[packageCateogryReportName].push(
          itemLists.map((item) => item.$.name)
        );
        break;
      case "category":
        if (Array.isArray(packageExplorer[packageItemsOrCategories])) {
          packageExplorer[packageItemsOrCategories].map((singleCategory) => {
            traversePackageTree(
              singleCategory,
              drawerObj[packageCateogryReportName]
            );
          });
        } else {
          traversePackageTree(
            packageExplorer[packageItemsOrCategories],
            drawerObj[packageCateogryReportName]
          );
        }

        break;
      default:
        break;
    }
  });
};
const traverseReportContents = (packageExplorer, contentObj) => {
  var packageCateogryReportName;
  Object.keys(packageExplorer).map((packageItemsOrCategories) => {
    switch (packageItemsOrCategories) {
      case "$":
        packageCateogryReportName =
          packageExplorer[packageItemsOrCategories].name;
        contentObj[packageCateogryReportName] = new Array();
        break;
      case "item":
        var itemLists =
          packageExplorer[packageItemsOrCategories].length === undefined
            ? [packageExplorer[packageItemsOrCategories]]
            : packageExplorer[packageItemsOrCategories];

        itemLists.map((item) => {
          var itemName = item.$.name;
          contentObj[packageCateogryReportName][itemName] = new Array();
          contentObj[packageCateogryReportName][itemName].push(item.component);
        });

        break;
      case "category":
        if (Array.isArray(packageExplorer[packageItemsOrCategories])) {
          packageExplorer[packageItemsOrCategories].map((singleCategory) => {
            traverseReportContents(
              singleCategory,
              contentObj[packageCateogryReportName]
            );
          });
        } else {
          traverseReportContents(
            packageExplorer[packageItemsOrCategories],
            contentObj[packageCateogryReportName]
          );
        }

        break;
      default:
        break;
    }
  });
};

const AppStructureController = ({ appXml }) => {
  const [Xml, setXml] = useState();
  const [HeaderStructure, setHeaderStructure] = useState();
  const [DrawerStructure, setDrawerStructure] = useState();
  const [ContentStructure, setContentStructure] = useState();
  const dispatch = useDispatch();

  var drawerObj = {};
  var ContentObj = {};
  const parseHeader = (Xml) => {};
  const parseDrawer = (Xml) => {
    Xml["navigation"]["category"].map((single) => {
      var packageExplorer = single;
      traversePackageTree(packageExplorer, drawerObj);
    });
    setDrawerStructure(drawerObj);
  };

  const parseContent = (Xml) => {
    Xml["navigation"]["category"].map((single) => {
      var packageExplorer = single;
      traverseReportContents(packageExplorer, ContentObj);
    });

    setContentStructure(ContentObj);
  };

  useEffect(async () => {
    parseString(appXml, options, function (err, result) {
      Xml === undefined && setXml(result);
    });
    Xml !== undefined && parseDrawer(Xml);
    Xml !== undefined && parseContent(Xml);
  }, [Xml]);

  const location = useLocation();
  const urlPath = location.pathname;
  const reportId = urlPath.split("/")[urlPath.split("/").length - 1];
  const packageId = urlPath.split("/").slice(1, urlPath.split("/").length - 1);

  return Xml !== undefined && ContentStructure !== undefined ? (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Navigation drawer={DrawerStructure} />}
        />
        <Route
          path="/appxml"
          render={(props) => <GenericXmlDocument xml={appXml} />}
        />
        <Route exact path="/dashboard" render={(props) => <Dashboard />} />
        <Route
          exact
          path={urlPath}
          render={(props) => (
            <ContentsController
              key={urlPath}
              content={ContentStructure}
              reportId={reportId}
              packageId={packageId}
            />
          )}
        />
      </Switch>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div>404 XML not found</div>
    </React.Fragment>
  );
};

export default AppStructureController;

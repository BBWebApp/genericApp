import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
// import Header from "@bit/bbconsult.standalone-components.wm-components.header";
// import Drawer from "@bit/bbconsult.standalone-components.wm-components.drawer";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import GenericXmlDocument from "./GenericXmlDocument";
import ContentsController from "./ContentsController";
import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

var parseString = require("xml2js").parseString;
var stripNS = require("xml2js").processors.stripPrefix;

const options = {
  tagNameProcessors: [stripNS],
  explicitArray: false,
};
const traversePackageTree = (
  packageExplorer,
  drawerObj,
  packageCateogriesItemsName
) => {
  var packageCateogryReportName;
  if (packageCateogriesItemsName !== undefined) {
    packageCateogryReportName = packageCateogriesItemsName;
  }
  Object.keys(packageExplorer).map((packageItemsOrCategories) => {
    switch (packageItemsOrCategories) {
      case "$":
        packageCateogryReportName =
          packageExplorer[packageItemsOrCategories].name;
        drawerObj[packageCateogryReportName] = new Array();
        break;
      case "categories":
        traversePackageTree(
          packageExplorer[packageItemsOrCategories],
          drawerObj,
          packageCateogryReportName
        );
        break;
      case "items":
        traversePackageTree(
          packageExplorer[packageItemsOrCategories],
          drawerObj,
          packageCateogryReportName
        );
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
            drawerObj[packageCateogryReportName],
            undefined
          );
        }

        break;
      default:
        break;
    }
  });
};
const traverseReportContents = (
  packageExplorer,
  contentObj,
  packageCateogriesItemsName
) => {
  var packageCateogryReportName;
  if (packageCateogriesItemsName !== undefined) {
    packageCateogryReportName = packageCateogriesItemsName;
  }
  Object.keys(packageExplorer).map((packageItemsOrCategories) => {
    switch (packageItemsOrCategories) {
      case "$":
        packageCateogryReportName =
          packageExplorer[packageItemsOrCategories].name;
        contentObj[packageCateogryReportName] = new Array();
        break;
      case "categories":
        traverseReportContents(
          packageExplorer[packageItemsOrCategories],
          contentObj,
          packageCateogryReportName
        );
        break;
      case "items":
        traverseReportContents(
          packageExplorer[packageItemsOrCategories],
          contentObj,
          packageCateogryReportName
        );
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
              contentObj[packageCateogryReportName],
              undefined
            );
          });
        } else {
          traverseReportContents(
            packageExplorer[packageItemsOrCategories],
            contentObj[packageCateogryReportName],
            undefined
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
    Xml["navigation"]["categories"]["category"].map((single) => {
      var packageExplorer = single;
      traversePackageTree(packageExplorer, drawerObj, undefined);
    });
    setDrawerStructure(drawerObj);
  };

  const parseContent = (Xml) => {
    Xml["navigation"]["categories"]["category"].map((single) => {
      var packageExplorer = single;
      traverseReportContents(packageExplorer, ContentObj, undefined);
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

  var urlDirectory = urlPath.split("/");
  if (urlDirectory[urlDirectory.length - 3] === "components") {
    urlDirectory = urlDirectory.slice(0, urlDirectory.length - 3);
  } else if (urlDirectory[urlDirectory.length - 2] === "components") {
    urlDirectory = urlDirectory.slice(0, urlDirectory.length - 2);
  } else if (urlDirectory[urlDirectory.length - 1] === "properties") {
    urlDirectory = urlDirectory.slice(0, urlDirectory.length - 1);
  }

  const reportId = urlDirectory[urlDirectory.length - 1];
  const packageId = urlDirectory.slice(1, urlDirectory.length - 1);

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
              urlpath={urlDirectory}
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

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import ContentsController from "./ContentsController";
import Dashboard from "./Dashboard";
import DashboardRecentlyXmlDocument from "./DashboardRecentlyXmlDocument";
import DashboardFavouritesXmlDocument from "./DashboardFavouritesXmlDocument";
import GenericXmlDocument from "./GenericXmlDocument";
// import Header from "@bit/bbconsult.standalone-components.wm-components.header";
// import Drawer from "@bit/bbconsult.standalone-components.wm-components.drawer";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import FavouriteGenericDashboard from "./FavouriteGenericDashboard";
import { removeDashboardItem } from "../redux/ducks/uploadImage";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";

var parseString = require("xml2js").parseString;
var stripNS = require("xml2js").processors.stripPrefix;

const options = {
  tagNameProcessors: [stripNS],
  explicitArray: false,
};
var reportPaths = {};
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
          if (item.component.constructor === Array)
            contentObj[packageCateogryReportName][itemName].push(
              item.component
            );
          else
            contentObj[packageCateogryReportName][itemName].push([
              item.component,
            ]);
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

const setReportPathUrlAndFirstComponent = (ContentStructure, reportUrl) => {
  Object.keys(ContentStructure).map((single) => {
    if (single != "0") {
      setReportPathUrlAndFirstComponent(
        ContentStructure[single],
        reportUrl + "/" + single
      );
    } else {
      reportPaths[reportUrl] = ContentStructure[single]["0"]["$"]["type"];
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
  var contentObj = {};

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
      traverseReportContents(packageExplorer, contentObj, undefined);
    });
    console.log(contentObj);
    setContentStructure(contentObj);
  };

  useEffect(async () => {
    parseString(appXml, options, function (err, result) {
      Xml === undefined && setXml(result);
    });

    Xml !== undefined && parseDrawer(Xml);
    Xml !== undefined && parseContent(Xml);
  }, [Xml]);
  var screenShots = useSelector((state) => {
    return state.downloadImage.images;
  });

  ContentStructure !== undefined &&
    setReportPathUrlAndFirstComponent(ContentStructure, "");
  if (Object.keys(reportPaths).length !== 0 && screenShots !== undefined) {
    screenShots.map((item) => {
      if (!Object.keys(reportPaths).includes(item["reportUrl"])) {
        setTimeout(() => {
          dispatch(
            removeDashboardItem(item["reportUrl"], item["reportElement"])
          );
          dispatch(getDownloadedImages(true));
          dispatch(getDownloadedImages());
        }, 150);
      }
    });
  }
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
        <Route
          path="/dashboard/recentlyXml"
          render={(props) => <DashboardRecentlyXmlDocument />}
        />
        <Route
          path="/dashboard/favouritesXml"
          render={(props) => (
            <DashboardFavouritesXmlDocument
              contentStructure={ContentStructure}
            />
          )}
        />
        <Route
          path="/dashboard/favourites"
          render={(props) => <FavouriteGenericDashboard />}
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
      <Box
        style={{ justifyContent: "center", alignItems: "center" }}
        sx={{ display: "flex" }}
      >
        {/* Loading... */}
        <CircularProgress />
      </Box>
    </React.Fragment>
  );
};

export default AppStructureController;

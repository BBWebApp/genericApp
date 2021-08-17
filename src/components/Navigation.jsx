import { Collapse, Drawer as WMDrawer } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 280;
const Styles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "rgb(225.0, 225.0, 225.0)",
    },
  },
  container: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      backgroundColor: "rgb(225.0, 225.0, 225.0)",
    },
  },
}));

const useStyles = makeStyles({});

const Drawer = (props) => {
  const classes = Styles();
  const { history } = props;
  const [favsNames, setFavsNames] = useState(undefined);
  const { drawer } = props;
  const [openedPackageTree, setOpenedPackageTree] = useState([]);
  var screenShots = useSelector((state) => state.downloadImage.favs); // state.reducer.stateName
  var favReportsNames = [];

  useEffect(() => {
    if (screenShots) {
      favReportsNames = [];
      screenShots.map((item) => {
        favReportsNames.push(Object.keys(item)[0]);
      });
      setFavsNames(favReportsNames);
    }
  }, [screenShots]);

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };
  const handleClick = (packageTree, packageInFocus) => {
    var packageTreeArray = packageTree.split("-.-");
    if (arraysEqual(packageTreeArray, openedPackageTree)) {
      var pckFocusIndex = packageTreeArray.indexOf(packageInFocus);
      if (pckFocusIndex !== -1)
        setOpenedPackageTree(packageTreeArray.slice(0, pckFocusIndex));
      else setOpenedPackageTree([""]);
    } else if (
      packageTreeArray.includes(packageInFocus) &&
      openedPackageTree.includes(packageInFocus)
    ) {
      setOpenedPackageTree(
        packageTreeArray.slice(0, openedPackageTree.indexOf(packageInFocus))
      );
    } else {
      setOpenedPackageTree(packageTreeArray);
    }
  };

  const itemUrl = (parentKey, packageOfItem, item) => {
    const parentPckIndex = openedPackageTree.indexOf(parentKey);
    const packageUrl =
      parentPckIndex === undefined || parentKey === undefined
        ? openedPackageTree[0]
        : parentKey.split("-.-").join("/") + "/" + packageOfItem;

    return "/" + packageUrl + "/" + item;
  };
  const drawerPackageTree = (categoryObject, parentKey, nestedLevel) => {
    return Object.keys(categoryObject).map((key, index) => (
      <>
        <ListItem
          className={classes.root}
          style={
            parentKey !== undefined
              ? { paddingLeft: `${nestedLevel * 32}px` }
              : undefined
          }
          button
          onClick={
            parentKey !== undefined
              ? () => handleClick(parentKey + "-.-" + key, key)
              : () => handleClick(key, key)
          }
        >
          <ListItemText primary={key} />
          {openedPackageTree === key ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={openedPackageTree.includes(key)}
          timeout="auto"
          unmountOnExit
        >
          <>
            {Object.keys(categoryObject[key]).map((categoryOrItem) => {
              if (categoryOrItem === "0") {
                return categoryObject[key].map((items) => {
                  return items.map((item) => {
                    return (
                      <ListItem
                        button
                        className={classes.root}
                        style={{ paddingLeft: `${(nestedLevel + 1) * 32}px` }}
                        onClick={() =>
                          history.push(itemUrl(parentKey, key, item))
                        }
                        key={item}
                      >
                        <ListItemIcon>
                          {favsNames && favsNames.includes(item) ? (
                            <StarIcon style={{ color: "#ed9a0d" }} />
                          ) : (
                            <StarBorder />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    );
                  });
                });
              } else {
                var newCategory = {};

                newCategory[categoryOrItem] =
                  categoryObject[key][categoryOrItem];
                if (parentKey === undefined)
                  return drawerPackageTree(newCategory, key, nestedLevel + 1);
                else {
                  return drawerPackageTree(
                    newCategory,
                    parentKey + "-.-" + key,
                    nestedLevel + 1
                  );
                }
              }
            })}
          </>
        </Collapse>
      </>
    ));
  };
  return drawer !== undefined ? (
    <WMDrawer
      elevation={2}
      classes={{ paper: classes.drawerPaper }}
      className={classes.drawer}
      variant="permanent"
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem
          className={classes.root}
          button
          onClick={() => history.push(`/dashboard`)}
        >
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <Divider
          variant="middle"
          light
          style={{ marginBottom: "3px", marginTop: "3px" }}
        />

        {drawerPackageTree(drawer, undefined, 0)}
      </List>
    </WMDrawer>
  ) : (
    <div>asd</div>
  );
};

export default withRouter(Drawer);

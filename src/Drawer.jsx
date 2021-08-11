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
import StarIcon from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;
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
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      backgroundColor: "rgb(225.0, 225.0, 225.0)",
    },
  },
}));

const Drawer = (props) => {
  const classes = Styles();
  const { history } = props;
  const [favsNames, setFavsNames] = useState(undefined);
  var drawer = {
    One: ["hey", "you", { newCategory: ["123"] }],
    three: ["and"],
  };

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const getDrawerView = (categoryObject) => {
    return Object.keys(categoryObject).map((key) => (
      <>
        <ListItem className={classes.root} button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={key} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categoryObject[key].map((item) => {
              if (typeof item === "object") return getDrawerView(item);
              else {
                return (
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => history.push(`/Defaults/${key}/` + item)}
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
              }
            })}
          </List>
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
          onClick={() => history.push(`/home`)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <Divider
          variant="middle"
          light
          style={{ marginBottom: "3px", marginTop: "3px" }}
        />
        {getDrawerView(drawer)}
      </List>
    </WMDrawer>
  ) : (
    <div>asd</div>
  );
};

export default withRouter(Drawer);

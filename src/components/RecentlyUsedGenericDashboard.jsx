import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";
import DashboardTile from "./DashboardTile";
import itemList from "./contentsValues";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";
import { getSlicedImage } from "../redux/ducks/serverCall";

const useStyles = makeStyles({
  recentlyUsed: {
    fontSize: "20px",
    color: "rgb(60.0, 60.0, 60.0)",
    marginBottom: "12px",
    borderBottom: "1px solid #787878",
  },
  cardHover: {
    "&:hover": {
      backgroundColor: "#ed9a0d",
    },
    borderRadius: "8px",
  },
});

const setImage = (screenShots) => {
  var numberOfScreenshots = screenShots.length;
  for (let index = 0; index < numberOfScreenshots; index++) {
    var screenshotItem = screenShots[index];
    Object.keys(screenshotItem).map((key) => {
      if (key !== "date" && key !== "reportUrl")
        return (
          (itemList[index]["imgSrc"] = screenshotItem[key]),
          (itemList[index]["title"] = key)
        );
      else if (key === "date") itemList[index]["date"] = screenshotItem[key];
      else if (key === "reportUrl")
        itemList[index]["reportUrl"] = screenshotItem[key];
    });
  }
};

const RecentlyUsedDashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  var screenShots = useSelector((state) => {
    return state.downloadImage.images;
  }); // state.reducer.stateName
  if (screenShots) {
    for (let index = 0; index < 6; index++) {
      itemList[index]["imgSrc"] = "";
    }
    setImage(screenShots);
  }
  return (
    <div>
      <Typography className={classes.recentlyUsed}>Recently used</Typography>
      <Grid
        style={{ marginLeft: "30px", marginTop: "30px" }}
        container
        spacing={1}
      >
        {itemList.map((item) => {
          return (
            <Grid
              item
              className={classes.cardHover}
              style={{ marginRight: "30px", marginBottom: "30px" }}
            >
              <DashboardTile {...item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default RecentlyUsedDashboard;

import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import FavouriteGenericDashboard from "./FavouriteGenericDashboard";
import RecentlyUsedGenericDashboard from "./RecentlyUsedGenericDashboard";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadedImages,
  GET_DOWNLOADIMAGES,
} from "../redux/ducks/downloadImage";
const useStyles = makeStyles({
  content: {
    marginLeft: "10px",
  },
});

const Welcome = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <RecentlyUsedGenericDashboard />
      <br />
      <br />
      <br />
      <FavouriteGenericDashboard />
    </div>
  );
};

export default Welcome;

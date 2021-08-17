import { Grid, IconButton, makeStyles } from "@material-ui/core";
import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useScreenshot } from "use-react-screenshot";
import { getSlicedImage } from "../redux/ducks/cropImage";
import { getDownloadedImages } from "../redux/ducks/downloadImage";
import { uploadImage } from "../redux/ducks/uploadImage";
import ReportComponentContent from "./ReportComponentContent";
import ReportComponentFooter from "./ReportComponentFooter";
import ReportComponentHeader from "./ReportComponentHeader";
import StarBorder from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles({});

const ReportComponentPage = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;
  const { packageId } = props;
  const reportElement =
    xmlResult[0].length === undefined
      ? xmlResult[0].$.type
      : xmlResult[0][0].$.type;
  const [favsNames, setFavsNames] = useState(undefined);
  const dispatch = useDispatch();
  const classes = useStyles();

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot();

  var screenShots = useSelector((state) => state.downloadImage.favs); // state.reducer.stateName
  var favReportsNames = [];

  const getImage = () => {
    setTimeout(() => {
      dispatch(getDownloadedImages(true));
      takeScreenShot(ref.current);
    }, 300);
  };
  const favouriteClicked = () => {
    if (image && slicedImage && reportId === slicedImage["reportId"]) {
      dispatch(
        uploadImage(slicedImage["slicedImage"], slicedImage["reportId"], true)
      );
      setTimeout(() => {
        dispatch(getDownloadedImages(true));
      }, 200);
    }
  };

  useEffect(() => {
    getImage();
  }, []);
  useEffect(() => {
    image && dispatch(getSlicedImage(image, reportId, reportElement));
    // setTimeout(() => {
    //   dispatch(getDownloadedImages(true));
    // }, 1000);
  }, [image]);

  var slicedImage = useSelector((state) => {
    return state.cropImage;
  }); // state.reducer.stateName
  if (image && slicedImage && reportId === slicedImage["reportId"]) {
    dispatch(uploadImage(slicedImage["slicedImage"], slicedImage["reportId"]));
  }

  useEffect(async () => {
    if (image && screenShots) {
      favReportsNames = [];
      screenShots.map((item) => {
        favReportsNames.push(Object.keys(item)[0]);
      });
      await setFavsNames(favReportsNames);
    }
  }, [image, screenShots]);

  return (
    <div>
      {/* {<img width="460px" src={image} />} */}
      <Grid item container direction="row" xs={12} sm={12} md={4}>
        <IconButton
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "flex-end",
          }}
          aria-label="add to favorites"
          onClick={favouriteClicked}
        >
          {favsNames !== undefined && favsNames.includes(reportId) ? (
            <StarIcon style={{ color: "#ed9a0d" }} />
          ) : (
            <StarBorder />
          )}
        </IconButton>
        <div ref={ref}>
          <ReportComponentHeader key={reportId} />
          <ReportComponentContent reportId={reportId} xmlResult={xmlResult} />
          <ReportComponentFooter key={reportId} />
        </div>
      </Grid>
    </div>
  );
};

export default ReportComponentPage;
import { CardHeader, CardMedia, IconButton, Paper } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { getDownloadedImages } from "../redux/ducks/downloadImage";
import { removeCard } from "../redux/ducks/uploadImage";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 0,
  },
  root: {
    maxWidth: 500,
    minWidth: 500,
  },
  media: {
    height: 250,
    paddingTop: "2.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  headerRoot: {
    maxHeight: "20px",
  },
  headerTitle: {
    color: "rgb(120.0, 120.0, 120.0)",
    marginLeft: "-10px",
  },
  deleteBtn: {
    "&:hover": {
      color: "#ed9a0d",
    },
  },
  overflowWithDots: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "115px",
    marginLeft: "-10px",
    color: "rgb(120.0, 120.0, 120.0)",
  },
}));
function SimpleCard(props) {
  const classes = useStyles();
  const { history } = props;
  const { deleteBtn } = props;
  const { position } = props;
  const { title, description, imgSrc, date, reportUrl } = props;
  const dispatch = useDispatch();

  return (
    <Paper elevation="4">
      {imgSrc && (
        <Card className={classes.root}>
            <CardHeader
              classes={{
                root: classes.headerRoot,
                title: classes.headerTitle,
              }}
              title={
                <Typography className={classes.overflowWithDots}>
                  {title}
                </Typography>
              }
              // subheader={date}
              titleTypographyProps={{ variant: "subtitle1" }}
              subheaderTypographyProps={{ variant: "body2" }}
              action={
                deleteBtn && (
                  <IconButton
                    style={{ backgroundColor: "white", maxHeight: "12px" }}
                    onClick={() => {
                      dispatch(removeCard(position));
                      setTimeout(() => {
                        dispatch(getDownloadedImages(true));
                      }, 200);
                    }}
                  >
                    <DeleteIcon className={classes.deleteBtn} />
                  </IconButton>
                )
              }
            />
          <Paper variant="elevation" elevation="2">
            <Link underline="none" component={RouterLink} to={reportUrl}>
              <CardMedia
                className={classes.media}
                component="img"
                src={imgSrc}
              />
            </Link>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                ></AccordionSummary>
                <CardContent>
                  <Typography>{description}</Typography>
                </CardContent>
              </Accordion>
            </div>
          </Paper>
        </Card>
      )}
    </Paper>
  );
}

export default withRouter(SimpleCard);

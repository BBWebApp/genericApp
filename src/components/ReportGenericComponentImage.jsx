import { makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { deepFind } from "react-children-utilities";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  img_margin: {
    paddingRight: "1000px",
  },
});
const ReportChart = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;
  const { order } = props;
  const [image, setImage] = useState();
  const [resizedImage, setResizedImage] = useState(undefined);
  const [Xml, setXml] = useState(undefined);

  var html = useSelector((state) => {
    var temp = state.serverCall.html;
    var image = temp[order]["Image"];
    return image;
  }); // state.reducer.stateName

  const resizeImage = (width, height) => {
    var img_temp = new Image();
    img_temp.src = image;
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      width = width;
    height = height;

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(img_temp, 0, 0, width, height);
    return canvas.toDataURL();
  };

  useEffect(async () => {
    (await Xml) === undefined && setXml(ReactHtmlParser(html));
    if (Xml !== undefined) {
      const children = Xml[0].props.children;

      if (children !== undefined) {
        deepFind(children, (child) => {
          if (Object.keys(child).includes("props")) {
            if (Object.keys(child.props).includes("id")) {
              if (child.props.id.includes("resizableImage")) {
                child.props.children.map((item) => {
                  if (item.type === "embed") {
                    setImage(item.props.src);
                  }
                });
              }
            }
          }
        });
      }
    }
  }, [Xml]);
  const classes = useStyles();
  useEffect(() => {
    image && setResizedImage(resizeImage(390, 300));
  }, [image]);

  return (
    image !== undefined &&
    resizedImage !== undefined && (
      <div>
        <img src={image} width={"90%"} height={"60%"} />
        {/* <img src={image} style={{ display: "none" }}  /> */}
      </div>
    )
  );
};

export default ReportChart;

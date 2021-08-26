import { makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { deepFind } from "react-children-utilities";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";

const useStyles = makeStyles({});
const ReportChart = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;
  const { order } = props;
  const [text, setText] = useState();
  const [resizedText, setResizedText] = useState();
  const [Xml, setXml] = useState(undefined);

  var html = useSelector((state) => {
    var temp = state.serverCall.html;
    var chart = temp[order]["Chart"];
    return chart;
  }); // state.reducer.stateName

  const imageToDataUri = (width, height) => {
    var img_temp = new Image();
    img_temp.src = text;
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
                    setText(item.props.src);
                  }
                });
              }
            }
          }
        });
      }
    }
  }, [Xml]);

  useEffect(() => {
    text && setResizedText(imageToDataUri(1600, 1000));
  }, [text]);

  return (
    text !== undefined && (
      <div>
        <img src={resizedText} />
        <img src={text} style={{ display: "none" }} />
      </div>
    )
  );
  // return text !== undefined && <div> {ReactHtmlParser(text)} </div>;
};

export default ReportChart;

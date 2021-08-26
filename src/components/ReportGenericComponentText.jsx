import { makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { deepFind } from "react-children-utilities";
import ReactDOMServer from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";

const useStyles = makeStyles({});
const ReportText = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;
  const { order } = props;

  const [text, setText] = useState();
  const [Xml, setXml] = useState(undefined);

  var html = useSelector((state) => {
    var temp = state.serverCall.html;
    var text = temp[order]["Text"];
    return text;
  }); // state.reducer.stateName

  useEffect(() => {
    Xml === undefined && setXml(ReactHtmlParser(html));
    if (Xml !== undefined) {
      const children = Xml[0].props.children;

      if (children !== undefined) {
        deepFind(children, (child) => {
          if (Object.keys(child).includes("props")) {
            if (Object.keys(child.props).includes("id")) {
              if (child.props.id === "content") {
                setText(
                  ReactDOMServer.renderToStaticMarkup(child.props.children)
                );
              }
            }
          }
        });
      }
    }
  }, [Xml]);

  return text !== undefined && <div> {ReactHtmlParser(text)} </div>;
};

export default ReportText;

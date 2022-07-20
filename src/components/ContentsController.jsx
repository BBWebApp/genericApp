// import Report from '@bit/bbconsult.standalone-components.wm-components.report'
// import Report from "../tempComponents/Report";
import React, { useEffect, useState } from "react";
// import ReportTemplatePage from '@bit/bbconsult.standalone-components.report-template-page'
import ReportGenericComponentPage from "./ReportGenericComponentPage";
import { useSelector, useDispatch } from "react-redux";
import { getReportHtml } from "../redux/ducks/serverCall";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReportGenericComponentContent from "./ReportGenericComponentContent";
import ReportComponentsObject from "./ReportComponentsObject";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const getReportComponents = (content, packageIds, reportId) => {
  for (let index = 0; index < packageIds.length; index++) {
    const packageName = packageIds[index];
    content = content[packageName];
  }
  return content[reportId];
};

const ContentsController = (props) => {
  const { reportId } = props;
  const { packageId } = props;
  const { content } = props;
  const [xmlResult, setxmlResult] = useState(undefined);

  var reportComponents = getReportComponents(content, packageId, reportId);
  var { history } = props;
  var urlPath = history.location.pathname;
  if (urlPath.includes("components") && urlPath.includes("inverse")) {
    urlPath = urlPath.split("/");
    urlPath = urlPath.slice(1, urlPath.length - 3);
    urlPath = urlPath.join("/");
  } else if (urlPath.includes("components")) {
    urlPath = urlPath.split("/");
    urlPath = urlPath.slice(1, urlPath.length - 2);
    urlPath = urlPath.join("/");
  } else if (urlPath.includes("properties")) {
    urlPath = urlPath.split("/");
    urlPath = urlPath.slice(1, urlPath.length - 1);
    urlPath = urlPath.join("/");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    reportComponents !== undefined && setxmlResult(reportComponents);
    dispatch(getReportHtml(reportId, packageId));
  }, []);

  var reportId_html_flag = useSelector((state) => {
    return state.serverCall.reportId_html_flag;
  }); // state.reducer.stateName

  var html = useSelector((state) => {
    var temp = state.serverCall.html;
    return temp;
  });
  var reportContent;
 
  if (
    reportComponents !== undefined &&
    xmlResult !== undefined &&
    reportId_html_flag === reportId
  ) {
    reportContent = (
      <ReportGenericComponentPage
        reportId={reportId}
        packageId={packageId}
        xmlResult={xmlResult}
      />
    );
  }
  // else if (content[reportId] === undefined) {
  //   reportContent = <Report key={reportId} reportId={reportId} />;
  // }
  else {
    reportContent = (
      <div>
        <Box sx={{ display: "flex" }}>
        {/* Loading... */}
          <CircularProgress />
        </Box>
      </div>
    );
  }
  return (
    xmlResult !== undefined &&
    html !== undefined && (
      <React.Fragment>
        <Switch>
          <Route
            path={`/${urlPath}/components/:param2/inverse`}
            render={(props) => (
              <ReportGenericComponentContent
                reportId={reportId}
                xmlResult={xmlResult}
                component={props.match.params.param2}
                inverse={true}
              />
            )}
          />
          <Route
            path={`/${urlPath}/components/:param2`}
            render={(props) => (
              <ReportGenericComponentContent
                reportId={reportId}
                xmlResult={xmlResult}
                component={props.match.params.param2}
                inverse={false}
              />
            )}
          />
          <Route
            path={`/${urlPath}/properties`}
            render={(props) => (
              <ReportComponentsObject
                reportId={reportId}
                xmlResult={xmlResult}
              />
            )}
          />
          <Route render={(props) => reportContent} />
        </Switch>
      </React.Fragment>
    )
  );
};

export default withRouter(ContentsController);

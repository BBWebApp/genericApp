// import Report from '@bit/bbconsult.standalone-components.wm-components.report'
// import Report from "../tempComponents/Report";
import React, { useEffect, useState } from "react";
// import ReportTemplatePage from '@bit/bbconsult.standalone-components.report-template-page'
import ReportComponentPage from "./ReportComponentPage";
import { useSelector, useDispatch } from "react-redux";
import { getReportHtml } from "../redux/ducks/serverCall";

const getReportComponents = (content, packageIds, reportId) => {
  for (let index = 0; index < packageIds.length; index++) {
    const packageName = packageIds[index];
    content = content[packageName];
  }
  return content[reportId];
};

const BodyFromDrawerController = (props) => {
  const { reportId } = props;
  const { packageId } = props;
  const { content } = props;
  const [xmlResult, setxmlResult] = useState(undefined);

  var reportComponents = getReportComponents(content, packageId, reportId);

  const dispatch = useDispatch();
  useEffect(() => {
    reportComponents !== undefined && setxmlResult(reportComponents);
    dispatch(getReportHtml(reportId, packageId));
  }, []);

  var reportId_html_flag = useSelector((state) => {
    return state.serverCall.reportId_html_flag;
  }); // state.reducer.stateName
  var reportContent;
  if (
    reportComponents !== undefined &&
    xmlResult !== undefined &&
    reportId_html_flag === reportId
  ) {
    reportContent = (
      <ReportComponentPage
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
    reportContent = <div>404 Report not found</div>;
  }
  return reportContent;
};

export default BodyFromDrawerController;

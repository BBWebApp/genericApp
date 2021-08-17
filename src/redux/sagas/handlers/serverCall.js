import { call, put } from "redux-saga/effects";
import { setReportHtml, setXML, setGenericApp } from "../../ducks/serverCall";
import { requestServerCall } from "../requests/serverCall";

export function* handleServerCall(action) {
  var dispatch_type = action["type"];

  try {
    switch (dispatch_type) {
      case "GET_XML":
        var response = yield call(requestServerCall, action);
        var xml = response.data;
        yield put(setXML(xml));
        break;
      case "GET_REPORT_HTML":
        var reportId = action["reportId_html_flag"];
        var response = yield call(requestServerCall, action);
        var html = response.data;
        var htmlArray = html.split("[{").splice(1);
        var htmlArraySize = htmlArray.length - 1;
        var reportComponents = [];
        htmlArray.map((item, index) => {
          if (index === htmlArraySize) {
            item = item.substring(0, item.length - 3);
          } else {
            item = item.substring(0, item.length - 4);
          }
          var key = item.substring(0, item.indexOf("="));
          var value = item.substring(item.indexOf("=") + 1);
          var component = {};
          component[key] = value;
          reportComponents.push(component);
        });
        yield put(setReportHtml(reportComponents, reportId));
        break;
      case "GET_GENERIC_APP":
        var response = yield call(requestServerCall, action);
        var sampleLayer = response.data;
        yield put(setGenericApp(sampleLayer));
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

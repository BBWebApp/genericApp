export const GET_XML = "GET_XML";
export const SET_XML = "SET_XML";

export const GET_REPORT_HTML = "GET_REPORT_HTML";
export const SET_REPORT_HTML = "SET_REPORT_HTML";

export const GET_GENERIC_APP = "GET_GENERIC_APP";
export const SET_GENERIC_APP = "SET_GENERIC_APP";
//REDUCERS

export const getXML = () => ({
  type: GET_XML,
});

export const setXML = (xml) => ({
  type: SET_XML,
  xml: xml,
});
export const getReportHtml = (reportId, packageId) => ({
  type: GET_REPORT_HTML,
  reportId_html_flag: reportId,
  packageId: packageId,
});

export const setReportHtml = (html, reportId) => ({
  type: SET_REPORT_HTML,
  reportId_html_flag: reportId,
  html: html,
});

export const getGenericApp = () => ({
  type: GET_GENERIC_APP,
});

export const setGenericApp = (htmlGeneric) => ({
  type: SET_GENERIC_APP,
  htmlGeneric: htmlGeneric,
});
// STATE
const initialState = {
  reportId_html_flag: undefined,
  packageId: undefined,
  xml: undefined,
  html: undefined,
  htmlGeneric: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_XML:
      var { xml } = action;
      return { ...state, xml: xml };
    case SET_REPORT_HTML:
      var { html } = action;
      var { reportId_html_flag } = action;
      return { ...state, html: html, reportId_html_flag: reportId_html_flag };
    case SET_GENERIC_APP:
      var { htmlGeneric } = action;
      return { ...state, htmlGeneric: htmlGeneric };
    default:
      return state;
  }
};

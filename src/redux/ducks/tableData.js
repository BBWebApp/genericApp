//ACTIONS
export const GET_TABLE_DATA = "GET_TABLE_DATA";
export const SET_TABLE_DATA = "SET_TABLE_DATA";

//REDUCERS
export const getTableData = (tableUrl, reportId) => ({
  type: GET_TABLE_DATA,
  tableUrl: tableUrl,
});

export const setTableData = (tableData, reportId) => ({
  type: SET_TABLE_DATA,
  tableData: tableData,
});

const initialState = {
  tableData: undefined,
  reportId: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_DATA:
      var { tableData } = action;
      return { ...state, tableData: tableData };
    default:
      return state;
  }
};

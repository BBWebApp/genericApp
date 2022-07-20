import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTableData } from "../redux/ducks/tableData";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  recentlyUsed: {
    fontSize: "20px",
    color: "rgb(60.0, 60.0, 60.0)",
    marginBottom: "12px",
    borderBottom: "1px solid #787878",
  },
  tableNormal: {
    whiteSpace: "nowrap",
  },
  tableContainer: {
    width: "100%",
    flexDirection: "row",

  },
  table: {
    display: "flex",
    whiteSpace: "nowrap",
  },
  tableHead: {
    display: "flex",
    flexDirection: "column",
  },
  tableBody: {
    display: "flex",
  },
  tableRow: {
    display: "flex",
    flexDirection: "column",
  },
});
const ReportTable = (props) => {
  const { xmlResult } = props;
  const { inverse } = props;
  const [columns, setColumns] = useState(undefined);
  const [rowsPerPageInverse, setrowsPerPageInverse] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(5);
  const [page, setpage] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  var colNames = [];
  var reportTableData = [];
  var tableDataState = useSelector((state) => {
    return state.tableData.tableData;
    // state.reducer.stateName
  });

  const setColumnNames = (columns) => {
    columns !== undefined &&
      columns.forEach((element) => {
        var name = element.$.name;
        if (!colNames.includes(name)) colNames.push(name);
      });
  };
  const setReportTableData = (tabledata) => {
    var allDataArray = [];
    Object.keys(tabledata.data).map((key) => {
      var item = tabledata.data[key];
      allDataArray.push(item);
    });
    allDataArray.map((item) => {
      const trial = Object.keys(item)
        .filter((key) => colNames.includes(key))
        .reduce((obj, y) => {
          obj[y] = item[y];
          return obj;
        }, {});

      reportTableData.push(trial);
    });
  };
  const changeRowsPerPage = (event, newRows) => {
    setrowsPerPage(event.target.value);
    setpage(0);
  };
  const changeRowsPerPageInverse = (event, newRows) => {
    setrowsPerPageInverse(event.target.value);
    setpage(0);
  };

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  useEffect(async () => {
    dispatch(getTableData(xmlResult.data.$.link));
    setColumns(xmlResult.columns.column);
  }, []);

  columns !== undefined && setColumnNames(columns);
  tableDataState !== undefined &&
    reportTableData.length === 0 &&
    setReportTableData(JSON.parse(tableDataState.response.payload));

  return columns !== undefined &&
    tableDataState !== undefined &&
    reportTableData.length !== 0 &&
    inverse === true ? (
    <TableContainer className={classes.tableContainer} >
      <TablePagination
        style={{ marginleft: "-250px", color: "#787878" }}
        rowsPerPageOptions={[1, 5, 10]}
        component="div"
        count={reportTableData.length}
        page={page}
        rowsPerPage={rowsPerPageInverse}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={changeRowsPerPageInverse}
        labelRowsPerPage={"Columns per page"}
      />
      <Divider
        style={{ background: "#5a5a5a", marginRight: "17px" }}
        variant="fullWidth"
      />
      <Table className={classes.table}>
        <TableRow className={classes.tableHead}>
          {Object.keys(reportTableData[0]).map((colName) => (
            <TableCell align="left" style={{ fontWeight: "bolder" }}>
              {colName}
            </TableCell>
          ))}
        </TableRow>
        <TableBody className={classes.tableBody}>
          {reportTableData
            .slice(
              page * rowsPerPageInverse,
              page * rowsPerPageInverse + rowsPerPageInverse
            )
            .map((oneRow) => {
              return (
                <TableRow className={classes.tableRow} key={oneRow.user_avg}>
                  {Object.keys(oneRow).map((key) => {
                    return <TableCell align="left">{oneRow[key]}</TableCell>;
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : columns !== undefined &&
    tableDataState !== undefined &&
    reportTableData.length !== 0 ? (
    <TableContainer >
      <TablePagination
        style={{ paddingRight: "150px", color: "#787878" }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reportTableData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={changeRowsPerPage}
      />
      <Divider
        style={{ background: "#5a5a5a", marginRight: "17px" }}
        variant="fullWidth"
      />
      <Table className={classes.tableNormal}>
        <TableRow >
          {Object.keys(reportTableData[0]).map((colName) => (
            <TableCell align="left" style={{ fontWeight: "bolder" }}>
              {colName}
            </TableCell>
          ))}
        </TableRow>

        <TableBody>
          {reportTableData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((oneRow) => {
              return (
                <TableRow  key={oneRow.user_avg}>
                  {Object.keys(oneRow).map((key) => {
                    return <TableCell  align="left">{oneRow[key]}</TableCell>;
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div></div>
  );
};

export default ReportTable;

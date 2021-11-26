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

const useStyles = makeStyles({
  tableContainer: {
    display: "flex",
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
  const [rowsPerPage, setrowsPerPage] = useState(10);
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
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableRow className={classes.tableHead}>
          {Object.keys(reportTableData[0]).map((colName) => (
            <TableCell align="right">{colName}</TableCell>
          ))}
        </TableRow>
        <TableBody className={classes.tableBody}>
          {reportTableData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((oneRow) => {
              return (
                <TableRow className={classes.tableRow} key={oneRow.user_avg}>
                  {Object.keys(oneRow).map((key) => {
                    return <TableCell align="right">{oneRow[key]}</TableCell>;
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reportTableData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={changeRowsPerPage}
      />
    </TableContainer>
  ) : columns !== undefined &&
    tableDataState !== undefined &&
    reportTableData.length !== 0 ? (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(reportTableData[0]).map((colName) => (
              <TableCell align="left">{colName}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {reportTableData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((oneRow) => {
              return (
                <TableRow key={oneRow.user_avg}>
                  {Object.keys(oneRow).map((key) => {
                    return <TableCell align="left">{oneRow[key]}</TableCell>;
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reportTableData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={changeRowsPerPage}
      />
    </TableContainer>
  ) : (
    <div></div>
  );
};

export default ReportTable;

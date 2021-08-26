import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  report_footer: {
    fontSize: "15px",
    width: "100%",
    marginLeft: "0px",
    marginRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    display: "block",
    backgroundColor: "white",
    textAlign: "center",
    position: "static",
    overflow: "hidden",
  },
});

const ReportTemplateFooter = () => {
  const classes = useStyles();
  return (
    <div className={classes.report_footer}>
      <p>
        <span>
          <font color="#808080">
            BB Consult Systemanalyse und Unternehmensberatung GmbH
            <br /> Sitz: Am Kaiserberg 24, 61231 Bad Nauheim
            <br />
            Gesch&auml;ftsf&uuml;hrer: Gerald Leitner-Leis, Robert F. Binder
            <br />
            Registergericht: Amtsgericht Friedberg/Hessen, HRB 1921,
            Ust-ldNr.DE195369330
          </font>
        </span>
      </p>
    </div>
  );
};

export default ReportTemplateFooter;

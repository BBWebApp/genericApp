import React from "react";
import ReactDOM from "react-dom";
import Drawer from "./Drawer";
import { BrowserRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Drawer />} />
        <Route
          exact
          path="/Home"
          render={(props) => (
            <div>
              <br />
              <br />
              <br />
              <br />
              <br />
              BB Consult GmbH was founded in 1998 and is a company specialised
              on capital markets solutions, with a main focus on: + integration
              and consolidation of cross-asset-platforms + managed services for
              the productive operation of these platforms + digital
              transformation + data management for process optimization and
              decision support + data mining / analysis for capital market
              platforms We combine our excellent product, business and IT
              know-how with suitable project management methodology for an
              efficient implementation. Our standard is not only to support
              capital markets organisations in their current transformation
              processes, but also to be a lasting, reliable partner. Through a
              continuing focus on this business, we distinguish ourselves from,
              for example, major service providers, who typically set their
              strategic focus on major projects. Capital markets projects in
              German financial institutes, which typically do not account for
              multi-digit millions of Euros, are of little interest to these
              companies. Therefore, these service providers lack sustainability
              in market cultivation, customer care and solution competence. With
              our standard, we strive to be regarded as a company for banking
              technology with the focus on capital markets within Germany.
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

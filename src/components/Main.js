import React from "react";
import { Route } from "react-router-dom";
import Products from "./Products";
import Nav from "./Nav";

const Main = () => {
  return (
    <div className="container">
      <h1>Acme Product Managers</h1>
      <Route component={Nav} />
    </div>
  );
};

export default Main;

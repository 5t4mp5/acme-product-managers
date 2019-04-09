import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { updateProducts, updateUsers } from "../store";
import Products from "./Products";
import Home from "./Home";
import Nav from "./Nav";

const mapDispatchToProps = dispatch => ({
  updateProducts: () => dispatch(updateProducts()),
  updateUsers: () => dispatch(updateUsers())
})

class Main extends Component{
  componentDidMount(){
    this.props.updateUsers()
      .then(() => this.props.updateProducts());
  }

  render(){
    return (
      <div className="container">
        <h1>Acme Product Managers</h1>
        <Route component={Nav} />
        <Switch>
          <Route path="/products" component={Products} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
};

export default connect(null, mapDispatchToProps)(Main);

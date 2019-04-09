import React, { Component } from "react";
import { connect } from "react-redux";

class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <li className="list-group-item">
        {product.name}
      </li>
    );
  }
}

export default Product;

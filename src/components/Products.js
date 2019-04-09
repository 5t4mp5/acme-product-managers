import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProducts } from "../store";
import Product from "./Product"

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  updateProducts: () => dispatch(updateProducts())
});

class Products extends Component {
  componentDidMount() {
    this.props.updateProducts();
  }
  render() {
    console.log(this.props);
    const { products } = this.props;
    return (
      <ul className="list-group">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

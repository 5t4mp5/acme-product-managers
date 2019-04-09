import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  products: state.products
});

const managerOpenings = (products) => {
    return products.some(product => !product.managerId)
  }

const Home = ({ products }) => (
    <div>
        {
            `We ${managerOpenings(products) ? "HAVE" : "DON'T HAVE"} openings for Product Managers!`
        }
    </div>
);

export default connect(mapStateToProps)(Home);

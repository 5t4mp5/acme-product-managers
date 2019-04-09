import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  users: state.users,
  products: state.products
});

const countManagers = (users, products) => {
  return users.filter(user =>
    products.find(product => product.managerId === user.id)
  ).length;
};

const Nav = ({ users, products, location }) => {
  const tabs = ["Home", "Products", "Managers"];

  return (
    <ul className="nav nav-pills" style={{ marginBottom: "20px" }}>
      {tabs.map(tab => (
        <li key={tab} className="nav-item">
          <Link
            to={`/${tab.toLowerCase()}`}
            className={`nav-link ${
              location.pathname === `/${tab.toLowerCase()}` ? "active" : ""
            }`}
          >
            {tab} {tab === "Managers" ? `(${countManagers(users, products)})` : ""}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default connect(mapStateToProps)(Nav);

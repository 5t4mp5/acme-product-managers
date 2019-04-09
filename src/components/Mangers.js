import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  users: state.users,
  products: state.products
});

const findManagers = (users, products) => {
  return users.filter(user =>
    products.find(product => product.managerId === user.id)
  );
};

const Managers = ({ users, products }) => (
  <ul>
    {findManagers(users, products).map(manager => (
      <li key={manager.id}>{manager.name}</li>
    ))}
  </ul>
);

export default connect(mapStateToProps)(Managers);

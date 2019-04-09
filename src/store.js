import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

const REFRESH_USERS = "REFRESH_USERS";
const REFRESH_PRODUCTS = "REFRESH_PRODUCTS";

const refreshUsers = users => ({
  type: REFRESH_USERS,
  users
});

export const updateUsers = () => {
  return dispatch => {
    return axios.get("/api/users").then(users => dispatch(refreshUsers(users.data)));
  };
};

const usersReducer = (state = [], action) => {
    switch (action.type) {
      case REFRESH_USERS:
        return action.users;
  
      default:
        return state;
    }
  };

const refreshProducts = products => ({
  type: REFRESH_PRODUCTS,
  products
});

export const updateProducts = () => {
  return dispatch => {
    return axios
      .get("/api/products")
      .then(products => dispatch(refreshProducts(products.data)));
  };
};

export const updateProductManager = product => {
  return dispatch => {
    return axios
      .put(`/api/products/${product.id}`, product)
      .then(() => dispatch(updateProducts()));
  };
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case REFRESH_PRODUCTS:
      return action.products;

    default:
      return state;
  }
};

const reducer = combineReducers({
    users: usersReducer,
    products: productsReducer
})

export default createStore( reducer, applyMiddleware(thunkMiddleware) );

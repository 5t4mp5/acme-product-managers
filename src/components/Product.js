import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProductManager } from "../store";

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  updateProductManager: product => dispatch(updateProductManager(product))
});

class Product extends Component {
  constructor() {
    super();
    this.state = {
      manager: {}
    };
  }
  handleChange = evt => {
    this.setState({ manager: this.props.users.find(user => user.name === evt.target.value) });
  };
  handleSubmit = () => {
    const { product } = this.props;
    product.managerId = typeof this.state.manager === "object" ? this.state.manager.id : null;
    this.props.updateProductManager(product);
  }
  componentDidMount(){
    this.setState({ manager: this.props.product.managerId
      ? this.props.users.find(user => user.id === this.props.product.managerId)
      : "-- none --" });
  }
  componentDidUpdate(prevProps){
    if(prevProps.users !== this.props.users){
      this.setState({ manager: this.props.product.managerId
        ? this.props.users.find(user => user.id === this.props.product.managerId)
        : "-- none --" });
    }
  }
  render() {
    const { product, users } = this.props;
    return (
      <li className="list-group-item">
        {product.name}
        <div
          style={{
            fontStyle: "italic",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        >
          Product Manager
        </div>
        <select
          className="form-control"
          name="manager"
          value={typeof this.state.manager === "object" ? this.state.manager.name : this.state.manager}
          onChange={this.handleChange}
        >
          <option value="-- none --">-- none --</option>
          {users.map(user => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="button" style={{ marginTop: "10px" }} onClick={this.handleSubmit}>Save</button>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

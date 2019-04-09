const { Product, User } = require("./db");

module.exports = () => {
  return Promise.all([
    User.create({ name: "Groucho" }),
    User.create({ name: "Harpo" }),
    User.create({ name: "Chico" }),
    User.create({ name: "Zeppo" })
  ])
    .then(users => {
      const products = ["foo", "bar", "bazz", "quq", "pow"];
      return Promise.all(
        products.map((product, idx) => {
          return Product.create({
            name: product,
            managerId: users[idx] ? users[idx].id : null
          });
        })
      );
    })
    .catch(e => console.log(e.message));
};

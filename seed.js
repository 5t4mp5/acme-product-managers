const { Product, User } = require("./db");

module.exports = () =>{
    return Promise.all([
        User.create({ name: "Groucho" }),
        User.create({ name: "Harpo" }),
        User.create({ name: "Chico" }),
        User.create({ name: "Zeppo" }),
    ]).then(results => console.log(results));
};



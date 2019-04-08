const Sequelize = require("sequelize");
const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const Product = db.define("product", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    unique: {
        args: true,
        msg: "PRODUCT NAME MUST BE UNIQUE"
    }
  }
});

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: "USER NAME MUST BE UNIQUE"
    }
  }
});

Product.belongsTo(User, { as: "manager" });

const seed = () => {
  return Promise.all([
    User.create({ name: "Groucho" }),
    User.create({ name: "Harpo" }),
    User.create({ name: "Chico" }),
    User.create({ name: "Zeppo" })
  ]).then(users => {
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

const dbSyncAndSeed = () => {
  return db
    .authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => console.log("DB SYNCED"))
    .then(() => seed())
    .catch(e => console.log(e.message));
};

module.exports = { dbSyncAndSeed, Product, User };

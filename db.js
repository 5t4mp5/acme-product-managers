const Sequelize = require("sequelize");
const db = new Sequelize(process.env.DATABASE_URL);

const Product = db.define("product", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            isUnique: true,
            notEmpty: true,
        },    
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
        validate: {
            isUnique: true,
            notEmpty: true,
        },    
    }
});

Product.belongsTo(User, { as: "manager" });

const dbSyncAndSeed = () => {
    return db.authenticate()
        .then(() => db.sync({ force: true }))
        .then(() => console.log("DB SYNCED"))
        .catch(e => console.log(e));
};

module.exports = { dbSyncAndSeed };

const express = require("express");
const app = express();
const path = require("path");
const { dbSyncAndSeed, Product, User } = require("./db");

const port = process.env.PORT || 3000;

app.get("/app.js", (req, res, next) =>
  res.sendFile(path.join(__dirname, "dist", "main.js"))
);

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/users", (req, res, next) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(next);
});

app.get("/api/products", (req, res, next) => {
    Product.findAll()
        .then(users => res.json(users))
        .catch(next);
});

app.put("/api/proucts/id", (req, res, next) => {
  Product.findOne({ where: { id: req.params.id } })
    .then(product => product.update(req.body))
    .then(product => res.json(product))
    .catch(next);
});

dbSyncAndSeed().then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
);

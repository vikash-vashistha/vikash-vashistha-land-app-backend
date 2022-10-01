const express = require("express");

const connect = require("./configs/db");

const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");
const { register, login } = require("./controllers/auth.controller");

const app = express();

app.use(express.json());

// /register
app.post("/register", register);
// .login
app.post("/login", login);

app.use("/users", userController);
app.use("/products", productController);

app.listen(2345, async () => {
  try {
    await connect();
  } catch (err) {
    console.error(err.message);
  }
  console.log("listening on port 2345");
});

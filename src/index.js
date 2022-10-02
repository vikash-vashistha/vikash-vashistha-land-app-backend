const express = require("express");
var cors = require("cors");

const connect = require("./configs/db");
const passport = require("./configs/google.oatuh")
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");
const { register, login } = require("./controllers/auth.controller");

const app = express();

app.use(cors());

app.use(express.json());

// /register
app.post("/register", register);
// .login
app.post("/login", login);

app.use("/users", userController);
app.use("/products", productController);


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false}),
  function(req, res) {
    
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  });



  app.get("/",(req,res)=>{
    return res.send({msg:"hello"})
  })



const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
  try {
    await connect();
    console.log("connected to atlas")
  } catch (err) {
    console.error(err.message);
  }
  console.log("listening on port 2345");
});

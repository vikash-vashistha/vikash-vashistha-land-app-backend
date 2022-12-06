const express = require('express');
const http = require('http');
var cors = require('cors');
// const { Server } = require("socket.io");
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const connect = require('./configs/db');
const passport = require('./configs/google.oatuh');
// const userController = require('./controllers/user.controller');
const productController = require('./controllers/product.controller');
const { register, login, newToken } = require('./controllers/auth.controller');
const transactionRouter = require('./controllers/transaction.controller');
const schemeController = require('./controllers/scheme.controller')
const landController = require('./controllers/land.controller')
const userController = require('./controllers/user.controller')
const cartController = require('./controllers/cart.controller')
const chatController = require('./controllers/chat.controller')

const app = express();

app.use(cors());

app.use(express.json());

// /register
app.post('/register', register);
// .login
app.post('/login', login);

app.use('/user', userController);
app.use('/products', productController);
app.use('/scheme', schemeController);
app.use('/land', landController);
app.use('/cart', cartController);
app.use('/chat', chatController);
//transaction
app.use('/transaction', transactionRouter);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    // then we will create the token for that user
    const token = newToken(req.user);

    // then return the user and the token
    res.send({user: req.user, token });
    res.redirect("/");
  }
);

app.get('/', (req, res) => {
  return res.send({ msg: 'hello' });
});

// rojerpay
const razorpay = new Razorpay({
  key_id: "rzp_test_X1AazF5paSfEvw",
  key_secret: "XPucnzKD8NGFS5pyITJmZYi2",
});

app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.post("/verification", (req, res) => {
  // do a validation
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

app.post("/razorpay", async (req, res) => {
  // console.log("body", req.body, "end")
  const payment_capture = 1;
  const amount = req.body.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 2345;

app.listen(PORT, async () => {
  try {
    await connect();
    console.log('connected to atlas');
  } catch (err) {
    console.error(err.message);
  }
  console.log('listening on port 2345');
});

// const httpServer = http.createServer(app);
// const wss = new Server(httpServer)

// httpServer.listen(PORT, async () => {
//   try {
//     await connect();
//     console.log("connected to atlas");
//   } catch (err) {
//     console.error(err.message);
//   }
//   console.log("listening on port 2345");
// });
const express = require("express");
const orderRouters = require("./routers/orderRoute");
const userRouter = require("./routers/userRouters");
const authtenticateUser = require("./middleware/auth");
const ordersRouters = require("./routers/ordersRoute");
const dbConfig = require("./config/database");
const session = require("express-session");
const MongoStore = require("connect-mongo"); //Used to connect session to Mongodb
require("dotenv").config();

const PORT = 3334;

const app = express();
dbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creating a express session || connecting session to mongodb
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessionStore",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use("/user", userRouter);

app.use("/order", authtenticateUser, orderRouters);

app.use("/orders", ordersRouters);

app.get("/", (req, res) => {
  // can use this to know how many people visited a site
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  res.send(`this is the amount of times you viewed ${req.session.viewCount}`);
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;

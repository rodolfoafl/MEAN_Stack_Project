const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/database");
const users = require("./routes/users");

const app = express();

const port = process.env.PORT || 8080;

//Connect to database
connectDB();

//CORS Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

//Index route
app.get("/", (req, res) => {
  res.send("Invalid endpoint!");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log("Server started on port", +port);
});

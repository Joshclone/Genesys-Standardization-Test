const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const { ROLE, users } = require("./controllers/Admin/data");
const { authUser, authRole } = require("./controllers/Admin/basicAuth");
const transferRouter = require("./routes/transfers");
const userRoutes = require("./routes/user");
const dbConfig = config.get("dbuser.dbConfig.dbName");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(setUser);

app.use("/transfers", transferRouter);

//everyone has access to our homepage
app.get("/", (req, res) => {
  res.send("Home Page- Welcome to Central Bank of Genesys Banking API service");
});

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page");
});

//this route is only available to the admin (an admin user)
app.get("/api/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Page");
});

//
app.use("/api/users", userRoutes);
//

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}


mongoose
  .connect(dbConfig)
  .then(() => console.log(`Connection to the database is successful`))
  .catch((e) => console.log(e.message));

app.listen(3000);

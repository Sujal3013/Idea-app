const express = require("express");
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
// const { init }=require('./models/user.model');
const userModel = require("./models/user.model");
const app = express();

/**
 * Logic to Connect to MongoDB and create an ADMIN user
 */

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to DB");
});

db.once("open", () => {
  console.log("DB is connected");

  init();
});

async function init() {
  /**
   * Initialize the MongoDB
   *
   * Need to create the ADMIN user
   */

  let admin = await userModel.findOne({
    userType: "Admin",
  });
  if (admin) {
    console.log("Admin user already present");
    return;
  } else {
    const new_admin = await userModel.create({
      name: "SujalMishra",
      userId: "admi001",
      emailId: "mishasujal64@gmail.com",
      userType: "Admin",
      password: "Auth1",
    });
    console.log(new_admin);
  }
}
app.listen(serverConfig.PORT, () => {
  console.log(`server started on port :${serverConfig.PORT}`);
});

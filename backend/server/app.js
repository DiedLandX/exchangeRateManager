const express = require("express");
require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const cors = require("cors");

const { Client } = require("pg");
const client = new Client();
client.connect();
const userPsqlRepository =
  require("./currencies/repository/currencyPsqlRepository")(client);
const currencyService = require("./currencies/currencyService")(
  userPsqlRepository
);
const { createUserRoutes } = require("./currencies/routes/currencyRoutes")(
  currencyService
);
const app = express();
app.use(
  cors({
    origin: "*",
    methods: "POST,GET",
    allowedHeaders: "Origin,Content-Type",
  })
);
app.use(bodyParser.json());
createUserRoutes(app);

const port = 8080;
app.listen(port, () => console.log("Listening on " + port));

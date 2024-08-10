const express = require("express");

const app = express();

require("dotenv").config();
require("./Models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("ping");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.listen(PORT, () => {
  console.log(`The Server is Running ${PORT} `);
});

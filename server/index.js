var express = require("express");
const { createTrialAccount } = require("./create-trial-drop");
var app = express();
const cors = require("cors");

async function getTrialAccount() {}
app.use(cors());
app.get("/", async (req, res) => {
  const result = await createTrialAccount();
  res.send({ result });
});
var server = app.listen(3000, function () {
  console.log("Express server has started on port 3000");
});

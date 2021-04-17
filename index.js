const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("attemp");
});

app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "production";

app.get("/", (req, res) => {
  res.send("Hello World Africa is the Future!!!!!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running in ${NODE_ENV} on port ${PORT}`);
});

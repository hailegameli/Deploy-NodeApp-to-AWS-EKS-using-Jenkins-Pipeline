const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const API_URL = process.env.API_URL || "http://localhost:5000";

app.get("/", (req, res) => {
  res.json({
    environment: NODE_ENV,
    api: API_URL
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running in ${NODE_ENV} on port ${PORT}`);
});

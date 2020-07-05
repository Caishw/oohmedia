const express = require("express");
const shoppingCenterRoutes = require("./routes/shoppingCenterRoutes");
const assetRouter = require("./routes/assetRoutes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the inventory app");
});

app.use("/shopping-centers", shoppingCenterRoutes);
app.use("/assets", assetRouter);

const server = app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

module.exports = server;

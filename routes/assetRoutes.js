const express = require("express");
const assetRouter = express.Router();
const { body, validationResult } = require("express-validator");
var AssetService = require("../assets/service");

assetRouter.get("/:id", (req, res) => {
  AssetService.get(req, res);
});

assetRouter.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("name is mandatory"),
    body("location").not().isEmpty().withMessage("location is mandatory"),
    body("active").not().isEmpty().withMessage("active is mandatory"),
    body("dimension").not().isEmpty().withMessage("dimension is mandatory"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    AssetService.create(req, res);
  }
);

assetRouter.get("/", (req, res) => {
  AssetService.getAll(req, res);
});

assetRouter.put("/:id", (req, res) => {
  AssetService.update(req, res);
});

assetRouter.delete("/:id", (req, res) => {
  AssetService.delete(req, res);
});

assetRouter.delete("/", (req, res) => {
  AssetService.deleteAll(req, res);
});

module.exports = assetRouter;

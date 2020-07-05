const { v4 } = require("uuid");
const db = require("../database");

exports.create = async (req, res) => {
  const { name, location, dimension, active, shoppingCenterId } = req.body;
  const id = v4();
  const sql =
    "insert into asset (id, name, location, dimension, active, shopping_center_id) values (?,?,?,?,?,?)";
  const params = [
    id,
    name,
    location,
    dimension,
    active === true ? 1 : 0,
    shoppingCenterId || null,
  ];
  db.run(sql, params, (error) => {
    if (error) {
      res.status(400).json({ error }).send();
    }
    res.status(201).json({ id }).send();
  });
};

exports.get = (req, res) => {
  const sql = `select * from asset where id= ?`;
  db.get(sql, [req.params.id], (error, row) => {
    if (error) {
      res.status(404).json({ errors: error.message }).send();
    }
    res
      .status(200)
      .json({ ...row })
      .send();
  });
};
exports.getAll = (req, res) => {
  const sql = "select * from asset";
  db.all(sql, [], (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error.message }).send();
    }
    res
      .status(200)
      .json({ data: rows || [] })
      .send();
  });
};
exports.update = (req, res) => {
  const params = [req.body.name, req.body.address, req.params.id];
  const sql = `update asset set name = COALESCE(?,name), location = COALESCE(?,location), dimension = COALESCE(?,dimension), shoppingCenterId = COALESCE(?,shoppingCenterId)  where id = ?`;
  db.run(sql, params, function (error) {
    if (error) {
      res.status(404).json({ errors: error.message }).send();
    }
    res
      .status(200)
      .json({
        id: req.params.id,
        name: req.body.name,
        address: req.body.address,
      })
      .send();
  });
};

exports.delete = (req, res) => {
  const params = [req.params.id];
  const sql = `delete from asset where id = ?`;
  db.run(sql, params, function (error) {
    if (error) {
      res.status(404).json({ errors: error.message }).send();
    }
    res.status(200).send();
  });
};

exports.delete = (req, res) => {
  const params = [req.params.id];
  const sql = `delete from asset`;
  db.run(sql, params, function (error) {
    if (error) {
      res.status(404).json({ errors: error.message }).send();
    }
    if (this.changes > 0) {
      res.status(200).send();
    }
  });
};

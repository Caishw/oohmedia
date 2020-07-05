const { v4 } = require('uuid');
const db = require('../../database');

exports.create = async (name, address, res) => {
  const id = v4();
  const sql = 'insert into shopping_center (id, name, address) values (?,?,?)';
  const params = [id, name, address];
  db.run(sql, params, (error) => {
    if (error) {
      res.status(400).json({ error }).send();
    }
    res.status(201).json({ id }).send();
  });
};

exports.getShoppingCenter = (req, res) => {
  const sql = `select * from shopping_center where id= ?`;
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
exports.getAllShoppingCenter = (req, res) => {
  const sql = 'select * from shopping_center';
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
exports.updateShoppingCenter = (req, res) => {
  const params = [req.body.name, req.body.address, req.params.id];
  const sql = `update shopping_center set name = COALESCE(?,name), address = COALESCE(?,address) where id = ?`;
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

exports.deleteShoppingCenter = (req, res) => {
  const params = [req.params.id];
  const sql = `delete from shopping_center where id = ?`;
  db.run(sql, params, function (error) {
    if (error) {
      res.status(404).json({ errors: error.message }).send();
    }
    res.status(200).send();
  });
};
exports.deleteAllShoppingCenter = (req, res) => {
  const params = [req.params.id];
  const sql = `delete from shopping_center`;
  db.run(sql, params, function (error) {
    if (error) {
      res.status(404).json({ errors: error.message }).send();
    }
    if (this.changes > 0) {
      res.status(200).send();
    }
  });
};

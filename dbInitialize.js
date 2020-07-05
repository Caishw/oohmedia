const db = require("./database");

const dbInitialize = {
  createShoppingCenterTable: () => {
    db.run(
      `CREATE table shopping_center (
              id text PRIMARY KEY,
              name text, 
              address text
              )`,
      (err) => {
        if (err) {
        }
      }
    );
  },
  dropShoppingCenterTable: () => {
    db.run(`DROP table shopping_center`, (err) => {});
  },

  emptyShoppingCenterTable: () => {
    db.run(`DELETE from shopping_center`, (err) => {});
  },

  createAssetTable: () => {
    db.run(
      `CREATE table asset (
              id text PRIMARY KEY,
              name text, 
              location text,
              dimension text,
              active integer,
              shopping_center_id text
              )`,
      (err) => {
        if (err) {
        }
      }
    );
  },
  dropAssetTable: () => {
    db.run(`DROP table asset`, (err) => {});
  },

  emptyAssetTable: () => {
    db.run(`DELETE from asset`, (err) => {});
  },
};

module.exports = dbInitialize;

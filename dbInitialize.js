const db = require('./database');

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
      },
    );
  },
  dropShoppingCenterTable: () => {
    db.run(`DROP table shopping_center`, (err) => {});
  },

  emptyShoppingCenterTable: () => {
    db.run(`DELETE from shopping_center`, (err) => {});
  },
};

module.exports = dbInitialize;

const express = require('express');
const shoppingCenterRoutes = require('./routes/shoppingCenterRoutes');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('An alligator approaches!');
});

app.use('/shopping-centers', shoppingCenterRoutes);

const server = app.listen(3000, () => {
  console.log('Gator app listening on port 3000!');
});

module.exports = server;

## Project Overview

This web app purpose is to provide the ooh media product management team to manage the inventories

## Tech Stack

- Javascript
- NodeJS
- Mocha
- Chai

## Getting started

Install node version manager nvm

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash

Switch to the correct version of Node that this app is tied to
nvm install 12
nvm use 12

Install Dependencies along with Dev Dependencies

    npm i

To start the project (Note this will start on PORT 3000)

    npm run start

# Route for Shopping center :

    localhost:3000/shopping-centers/

Things to do to complete the app

[ ] Add routes for Asset
[ ] Add routes for user
[ ] Update the shopping center schema and route to take in the Asset id to update
[ ] Update all routes for shopping center and asset to be authorised
[ ] Script to initialize the DB before app starts
[ ] Use Serialize to create model for the DB resource

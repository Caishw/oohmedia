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

## Route for Shopping center :

    localhost:3000/shopping-centers/

## Route for Shopping center :

    localhost:3000/shopping-centers/<id>/assets/

Things to do to complete the app

[ ] Add routes for user\
[ ] Update the shopping center schema and route to take in the Asset id to update\
[ ] Update all routes for shopping center and asset to be authorised\
[ ] Script to initialize the DB before app starts\
[ ] Use Serialize to create model for the DB resource\
[ ] Use nodemon to monitor file changes in dev mode\
[ ] Fix failing tests for Assets route

## Approach to solving the problem :

    1. It was clear that the app needed routes to manage the shopping centers and assets, so i started with the test for shopping center routes. It took me sometime to get the basic setup up and running with the test framework.
    2. Once I was happy with the shopping center routes, i refactored it to separate route and a service to modularize the app.
    3. Next I moved to Asset routes, took a similar approach as shopping routes. (Basically copy and pasted the routes from shopping-center)
    4. Few more things I was planning to do but ran out of time was
       - Create a relation between asset and shopping center
       - Provide an API to fetch the shopping centers along with assets. That way if we need only shopping center data, we wont be stressing the DB with loading the associated assets as well.
       - Create a user route and allow users to login and logout.
       - Provide an auth code once the user logs in, which can be used in susbsequent requests.
       - Create a react app with pages to view shopping center and associated assets, ability to update/delete assets, login and logout a user.

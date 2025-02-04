# url-shorterner
API and Frontend to shorten URLS and display them

# Development
To run the backend of the project run docker-compose up to start the database and node server. This runs on localhost:3000. The database is seeded with some values which can be seen in the init.json file in the data file folder.
The urls available are:  
* POST - /v1/api/create-url 
  - example request body  `{ fullUrl: 'https://www.google.co.uk' }` 
  - must be a valid URI.
* DELETE - /v1/api/delete-url/:urlID
* GET - /v1/api/urls 
* PATCH /v1/api/update-url 
  - example request body `{ newUrl: 'https://www.google.co.uk', urlId: '12345678'}` 
  - must be a valid URI.

To run the frontend of the project run the following commands: 
```
cd packages/frontend
yarn install
yarn serve
```
This will provide a link and the port information about where this is hosted.

# Tests
Tests can be run from each package by running `yarn test:unit` after running `yarn install`.

# TODOS
* Add authentication on API (maybe JWT)
* Add integration tests to test integration with dynamo
* Add E2E tests to test the whole system
* Add functionality to frontend to make use of /v1/api/update-url endpoint 

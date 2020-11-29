# url-shorterner
API and Frontend to shorten URLS and display them

# development
To run the backend of the project run docker-compose up to start the database and node server. This runs on localhost:3000. The database is initially empty so either using the frontend or an api call URLs will need to be added. This can be achieved using the post endpoint listend below and must be a valid URI (e.g https://www.google.co.uk).

The urls available are:  
* POST - /v1/api/create-url method body: { fullUrl: string } (must pass uri validation check)
* DELETE - /v1/api/delete-url/:urlID
* GET - /v1/api/urls 
* PATCH /v1/api/update-url method body: { newUrl: string, urlId: string}

To run the frontend of the project run the following commands: 
```
cd packages/frontend
yarn install
yarn serve
```
This will provide a link and the port information about where this is hosted.

# tests
Tests can be run from each package by running `yarn test:unit` after running `yarn install`.

# TODOS
* Add authentication on API (maybe JWT)
* Add integration tests to test integration with dynamo
* Add E2E tests to test the whole system
* Add functionality to frontend to make use of /v1/api/update-url endpoint 
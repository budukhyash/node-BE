### Setting up

- use **npm install** for installing dependencies
- use **npm start** for starting server

### Usage

- **Login**
  - Request Body -> { "username":"YOUR_USERNAME", "password":"YOUR_PASSWORD" }
  - Returned -> { "token":"YOUR_TOKEN" }
- **JSON Patch**
  - Header -> Authorization : "Bearer YOUR_TOKEN"
  - Request Body -> { "jsonObject": {JSON_OBJECT} , "jsonPatch": [{JSON_PATCH}] }
  - Returned -> { "Patched":"JSON_OBJECT_WITH_PATCH" }
- **Thumbnail Creation**
  - Header -> Authorization : "Bearer YOUR_TOKEN"
  - Request Body -> { "url":"IMAGE_URL" }
  - Returned -> { "message":"RESPECTIVE_MESSAGE" }
  - Thumbnail stored in /public/images/thumbnail

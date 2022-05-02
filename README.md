# Favs-Api
## Description
Favs is a new company that aims to provide a better way to organize your favorite things: music, clothes, courses, etc., all in one place.

## Installation
his is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js v14 or higher is required.
Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install
```

and

```console
$ npm start
```

## Endpoints

| Route	| HTTP Verb | Description |
| :--- | :--- | :--- |
| /api/favs | GET	|	Get all list of favorites |
| /api/favs | POST | Creates a new list of favorites |
| /api/favs/:id | GET | Get a single list of favorites |
| /api/favs/:id | DELETE |	Deletes a list of favorites |
| /auth/local/login | POST |	Login user by email/password |

## Authorization

To authenticate an API request, you should provide your API key in the `Authorization` header.

## Request bodies

### Create user
**Request:**
```json
{
    "username": "test@mail.com",
    "password": "123456" 
}
```

### Login
**Request:**
```json
{
    "username": "rocio@gmail.com",
    "password": "12345!" 
}
```
### Create a new list of favorites

**Request:**
```json
{
    "name": "Fav List 1",
    "favs": [
        {
            "title": "Fav 1",
            "description": "Description fav 1",
            "link": "https://safe1.com"
        }
    ]
}
```

## Testing
In order to run test cases:

```console
$ npm run test
```

## Dependencies
- "bcrypt": "^5.0.1",
- "body-parser": "^1.20.0",
- "composable-middleware": "^0.3.0",
- "cors": "^2.8.5",
- "dotenv": "^16.0.0",
- "express": "^4.18.1",
- "jsonwebtoken": "^8.5.1",
- "lodash": "^4.17.21",
- "mongoose": "^6.3.1",
    "morgan": "^1.10.0"

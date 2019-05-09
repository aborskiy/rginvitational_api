# Assignment 2 - ReactJS App & API.

Name: Alex Borskiy

## Overview.
...... A statement of the app concept and objectives (just a few lines) ........
The application is a web API for resources needed to support administrative functions for Rhytmic Gymnastics competition.  The application provides access to CRUD operations needed to maintain resources via REST interface.

 . . . . . List of user features (excluding user registration and authentication) . . . . 
 
 + Application provides REST services to maintain participant information, scores and rotation:
    /api/participants
    /api/score 
    /api/rotationentries
    /api/rotationsession
 
 + In addition to standard REST GET, POST, PUT, DELETE types, "rotationentries" service can handle bulk operations,             allowing to insert and delete multiple entries in one request using custom header "x-action" with value "bulk".

 + API Protection
    Application uses 3rd party application Auth0 to allow access to some resources only by approved calling applications.

 + Validation
    Application uses express-validator middlewares to validate request body and parameters.

 + Separation of concerns
    The routing, data validations, db interactions and data representations are separated in the different layers in the code. 
    There are separate folders in the code for different layer: routes, controllers, validators, models.  
    The routers programs use express router and chain necessary middleware on REST url path.
    The middleware used to perform the following functions:
    1. Authentication - checks Access Token existance and verifies it against
        the Auth0 JSON Web Key Set.  This middleware uses 3rd party npm packages
        express-jwt, express-jwt-authz, jwks-rsa

    2.  Check results of authentication. Custom build middleware to check results of Authentication and     to set HTTP response status to 401 in case of Unauthorized Error.

    3.  Check for custom header X-ACTION.  Custom build middleware to intercept http headers and check for presence of X-ACTION header with value "bulk".  This middleware directs processing to different controllers.

    4.  Data validations.  There is a separate validator for each resource.  This middleware uses 3rd party npm package express-validator and performs basic checks on incoming data.    

    5.  Check validation result.  Custom build middleware which checks results of validation and sets HTTP response status to 422 in case of invalid request.

    6.  Database interaction.  These are controllers middleware which interact with Mongoose models to perform Create, Read, Update, Delete database operations.

 + Documentation via Swagger /api-docs.
    Application provides documentation about all available REST services.  The documentation can be accessed real-time at {home url}/api-docs.  The documentation is generated using Express Swagger Generator npm package automatically. 


 + Testing reports.
    Mochawesome reports are produced after each build and awailable on-line at TODO: pages url

## Installation requirements.
Assumes that node.js is installed on your machine.  Please refer to [Node Page](https://nodejs.org/en/) if node needs to be installed.

- download the source code, open terminal and navigate to rginvitational_api folder 

- verify that npm is installed.
```
npm -v
```

- install required packages
```
npm install
```

- start application
```
npm start
```

###### Data Model Diagram

![Data Model Diagram](docs/images/rginvitational_data_model.png)

###### Data Model Sample Data

[Sample data](db.json)

# Web API Endpoint Reference
. . . Give a brief overview of the Web API functionality.
Web API allows CRUD operations on 4 resources: participants, scores, rotationentries, rotationsession.

## Web API Install and Operation
. . . . Describe how to install/start/stop the API. It would be a good idea to go though the scripts section of the package.json file.
Please use ## Installation requirements sections for details on how to install and start the application.

"npm start" command executes "nodemon -r esm index.js" script.  The nodemon runs the code and automatically restarts when code changes.  The "-r" flag is used to require "esm" module on start.
The "esm" module is "A fast, production ready, zero-dependency ES module loader for Node 6+!". 

## API Design
Describe your web API.

This information is also available through automatically generated swagger documentation http://rginvitationalapi.eu-west-1.elasticbeanstalk.com/api-docs
Swagger documentation also provides the sample of request/response and allows to try out each request.


| HTTP Verb & Path |  Description |
| -- | -- |
| **GET** /api/participants |get all participants |
| **GET** /api/participants/{id} |get participant by id |
| **POST** /api/participants |post participant |
| **PUT** /api/participants/{id} | update participant |
| **DELETE** /api/participants/{id} | delete a participant |

| **GET** /api/rotationentries |get all rotationentries |
| **PUT** /api/rotationentries/{id} |update rotation entry by id |
| **DELETE** /api/rotationentries{id} |delete rotation entry by id |
| **POST** /api/rotationentries | post all rotationentries - needs to have X-ACTION=bulk header |
| **DELETE** /api/rotationentries | delete all rotationentries - needs to have X-ACTION=bulk header |

| **GET** /api/rotationentries |get all rotationentries |
| **PUT** /api/rotationentries/{id} |update rotation entry by id |
| **DELETE** /api/rotationentries/{id} |delete rotation entry by id |
| **POST** /api/rotationentries | post all rotationentries - needs to have X-ACTION=bulk header |
| **DELETE** /api/rotationentries | delete all rotationentries - needs to have X-ACTION=bulk header |

| **GET** /api/rotationsession |get rotationsession |
| **POST** /api/rotationsession |post rotationsession |
| **PUT** /api/rotationsession/{id} |update rotation session |
| **DELETE** /api/rotationsession/{id} |delete rotation session |


| **GET** /api/scores |get all scores |
| **POST** /api/scores |post new score |
| **PUT** /api/scores/{id} |update score by id |
| **DELETE** /api/scores/{id} |delete score by id |

## API Configuration
Describe the configuration approach for your endpoint. For example, contents of config file and where it should be located:
The application uses the following environment variables which are configured for AWS Elaticbeanstalk container.  To run application locally, the same envrionment variable can be set in .env file.

NODE_ENV=production
PORT=8080
HOST=localhost
PRODHOST=rginvitationalapi.eu-west-1.elasticbeanstalk.com  - not needed to install locally

mongoDB=mongodb+srv://RGInvitational_API:??????????????????????????.mongodb.net/rginvitational?retryWrites=true

# authentication middleware
EXPRESS_JWT_SECRET_CACHE=true
EXPRESS_JWT_SECRET_RATELIMIT=true
EXPRESS_JWT_SECRET_JWKSREQUESTSPERMINUTE=5
        
EXPRESS_JWT_SECRET_JWKSURI=https://**************.auth0.com/1234567/secret.json
JWT_AUDIENCE=https://**********************.auth0.com/api/v2/
JWT_ISSUER=https://****************************.auth0.com/
JWT_ALGORITHM=RS256

# test access token
TEST_ACCESS_URL=https://**********************.auth0.com/oauth/token
TEST_ACCESS_GRANT_TYPE=client_credentials
TEST_ACCESS_CLIENT_ID=**************
TEST_ACCESS_CLIENT_SECRET=**********************
TEST_ACCESS_AUDIENCE=https://****************.auth0.com/api/v2/

~~~

## Security and Authentication
. . . . Give details of any autentication/security implemented in on the API. Indicate which routes are protected.
All application POST, PUT, DELETE REST services are protected and require calling application to be authenticated.  
The authorization and authentication are done using external vendor Auth0. 
Here is the sequence of interactions used to authenticate API call. 
1.  Auth0 authenticates the user (user is authenticated when he signs in on front-end page).
2.  Auth0 responds with Access Token.
3.  Front-end application then calls this API application, passing Access Token in HTTP Authorization header.
4.  The API application validates the Access Token using express-jwt npm package.

The application uses 3rd party npm packages to work with Auth0:
1. express-jwt - to validate Access Token.
2. express-jwt-authz - to check scope.
3. jwks-rsa - to get public key and complete verification

## Testing
. . . . Briefly explain any testing strategy that accompanies the project, including and example report if you have one...
![][image4]

## Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional, developed for the app. This would include user registeration and authentication, improved re-rendering policies, etc . . . . . .  

## Independent learning.

. . . . . State the non-standard aspects of React (or other related technologies) that you researched and applied in this assignment . . . . .  

Express API authentication with Auth0 -  https://auth0.com/docs/quickstart/backend/nodejs


[model]: ./data.jpg
[image3]: ./screen.png
[stories]: ./storybook.png
[image4]: ./testing.png


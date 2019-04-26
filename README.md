3rd party
-------------
https://www.npmjs.com/package/mongoose-auto-increment

swagger doc
----------------
https://www.npmjs.com/package/express-swagger-generator

passport with google authentication
------------------------------------
http://www.passportjs.org/packages/passport-google-oauth20/
https://github.com/passport/express-4.x-facebook-example
https://www.djamware.com/post/58eba06380aca72673af8500/node-express-mongoose-and-passportjs-rest-api-authentication

google search
-------------
javascript google authentication token

https://github.com/react-native-community/react-native-google-signin
https://developer.okta.com/blog/2018/08/21/build-secure-rest-api-with-node

auth0
-------
https://auth0.com/docs/microsites/protect-api/protect-api
https://auth0.com/docs/quickstart/backend/nodejs
https://auth0.com/docs/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow

npm install --save express-jwt jwks-rsa express-jwt-authz

express-validator 3rd party for API data validation.
-------------------
https://medium.freecodecamp.org/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7

sample of separarting routes and controllers and deploying app to heroku
--------------------------------------------------------------------------
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
https://github.com/mdn/express-locallibrary-tutorial

TODO: 
-----
2019/04/08 code router for participant, then controller and model in separate folders.
https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
https://github.com/mdn/express-locallibrary-tutorial

Then use express-validator to validate and sanitize.
https://medium.freecodecamp.org/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7
https://express-validator.github.io/docs/check-api.html

Deploying
-----------
https://auth0.com/blog/the-complete-guide-to-deploying-javascript-applications-part-1/
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
?https://www.cannyengineer.com/blog/deploying-express-typescript-elastic-beanstalk
!https://medium.com/@vygandas/how-to-deploy-your-nodejs-app-on-amazon-elastic-beanstalk-aws-eb-with-circleci-short-tutorial-d8210d2a7f0c


Testing
---------
routes are tested with Authorization feature.  Access token for testing is obtained through Auth0 Authentication API.


Zip
------
zip -r rginvitational_api.zip RGInvitational_API -x "*node_modules*" -x ".env*" -x "*.git*" -x".vscode" -x "*\.DS_Store" -x "*/\.*" 

cd RGInvitational_API
zip -r rginvitational_api.zip . -x "*node_modules*" -x ".env*" -x "*.git*" -x ".vscode*" -x "*\.DS_Store" -x "*/\.*" 
zip -r rginvitational_api.zip . -x "*node_modules*" -x ".env*" -x "*.git*" -x ".vscode*" -x ".DS_Store" -x ".*" 

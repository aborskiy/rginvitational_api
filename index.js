require = require("esm")(module/*, options*/);
module.exports = require("./main.js");

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import expressValidator from 'express-validator';
import './db';
import participantRouter from './api/routes/participants';
import scoresRouter from './api/routes/scores';
import rotationentriesRouter from './api/routes/rotationentries';
import rotationsessionRouter from './api/routes/rotationsession';
import ua from 'universal-analytics';

var visitor = ua(process.env.GTAG, {http: true}, {uid: 'rginvitational-api'});

var cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  };

dotenv.config();

export const app = express();
//const subpath = express();
const port = process.env.PORT;

// allow cors
app.use(cors(corsOptions));
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(expressValidator());
// routes 

app.use('/api/participants', participantRouter);
app.use('/api/scores', scoresRouter);
app.use('/api/rotationentries', rotationentriesRouter);
app.use('/api/rotationsession', rotationsessionRouter);
visitor.event('API', 'Hit',  function (err) {
  if (err){
    console.log(`top level index - error when calling Google Analytics err: ${err}` )
  }
});


// swagger generator
const expressSwagger = require('express-swagger-generator')(app);
let host = `${process.env.HOST}:${process.env.PORT}`;
if (typeof process.env.PRODHOST !== 'undefined') {
  host = process.env.PRODHOST;
}
let options = {
  swaggerDefinition: {
      info: {
          description: 'RG Invitational API',
          title: 'Swagger',
          version: '1.0.0',
      },
      //host: `${process.env.HOST}${process.env.PORT ? ':' + process.env.PORT : ''}`,
      host: host,
      basePath: '',
      produces: [
          "application/json"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
  basedir: __dirname, //app absolute path
  //files: ['./api/**/*.js'] //Path to the API handle folder
  files: ['./api/**/*.js', './api/**/**/*.js' ] //Path to the API handle folder
};

expressSwagger(options);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});


import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import expressValidator from 'express-validator';
import './db';
import participantRouter from './api/routes/participants';
import scoresRouter from './api/routes/scores';
import rotationentriesRouter from './api/routes/rotationentries';
import rotationentriesBulkRouter from './api/routes/rotationentriesBulk';
import rotationsessionRouter from './api/routes/rotationsession';

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


// swagger generator
const expressSwagger = require('express-swagger-generator')(app);
let options = {
  swaggerDefinition: {
      info: {
          description: 'RG Invitational API',
          title: 'Swagger',
          version: '1.0.0',
      },
      host: 'localhost:8080',
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


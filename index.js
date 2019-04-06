import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import './db';
//import authRouter from './api/auth';
import userRouter from './api/user';
import participantRouter from './api/participants';
import loadParticipants from './participantsData';


dotenv.config();

export const app = express();
const subpath = express();
const port = process.env.PORT;

if (process.env.seedDb) {
  console.log(`index.js - will loadParticipants()`);
  loadParticipants();
}

//configure body-parser
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/participants', participantRouter);

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
  files: ['./api/**/*.js'] //Path to the API handle folder
};

expressSwagger(options);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import participantRouter from './api/participants';
import './db';
import loadParticipants from './participantsData';

dotenv.config();

const app = express();
const port = process.env.PORT;

if (process.env.seedDb) {
  loadParticipants();
}

//configure body-parser
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/participants', participantRouter);
app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
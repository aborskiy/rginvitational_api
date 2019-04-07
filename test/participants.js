import { app } from './../index.js';
import participantInfoModel from '../api/participants/participantInfoModel';
const should = require('should');
const request = require('supertest');

describe('participants', () => {

    before(async () => {
        await loadParticipants();
    });

    describe('GET participants', () => {
        it('should get all participants', (done) => {
            request(app)
                .get('/api/participants')
                .expect(200)
                .then(res => {
                    // HTTP status should be 200
                    res.should.have.property('status').equal(200);
                    //res.body.length.should.be.above(0);
                    console.log(`GET participants test is completed response body: ${JSON.stringify(res.body)}`);
                    done();
                });;
        });
    });

    describe('GET participant by id', () => {
        it('should NOT get one participant by id', (done) => {
            request(app)
                .get('/api/participants/1')
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 200
                    res.should.have.property('status').equal(404);
                    console.log(`should GET one participant is completed, response body: ${JSON.stringify(res.body)}`);
                    done();
                });
        });
    });


    describe('POST participants', () => {
        let participant1 = {
            "name": {
                "first": "Carol",
                "last": "MacDonald"
            },
            "team": "USA"
        };
        it('should POST one participant', (done) => {
            request(app)
                .post('/api/participants')
                .send(participant1)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qWTFNVUkzTkVFMU16YzJNMFl6TURkRE1rUkNPREk1UkVKR00wSkNPVGN5TmpSR00wUkdPUSJ9.eyJpc3MiOiJodHRwczovL2Fib3Jza2l5LmF1dGgwLmNvbS8iLCJzdWIiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5a0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hYm9yc2tpeS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU1NDU1NjMxNiwiZXhwIjoxNTU0NjQyNzE2LCJhenAiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5ayIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.bRZIK7xfgTqHYCqQvNYBSzrJKH5t-oHF_ourJnwfA_MYRMI9nattFkJwi0Wv09lWWoc2oKUemV9Zhn04dSOhoszQMC-9cSYXEgILSJc9ZCVnff7ER9tQvacZv9wgwDAZSmYdFrZ2kZlNcaTDq5XyczfgAbRa_8CHjxh_OxD8_9ugi06YHYpzLQ03G7H2ILnJFyoZ4DVVNIdFErEol65jBhG9ZYD9YmrWYxLDSDhnprnUvB2wcfB6uHosxk7F4LVGmpzhrMXMx5AdlehOGVt1B8lduhF951FCgr3K3NDZ__n1Nvk-SIw1nWXn7yufIaadHijfVsg6v1wratydJDiN2Q')
                .expect('Content-Type', /json/)
                .expect(201)
                .then(res => {
                    // HTTP status should be 201
                    res.should.have.property('status').equal(201);
                    res.body.participant.should.have.property('id');
                    res.body.participant.name.first.should.equal('Carol');
                    console.log(`should POST one participant is completed, response body: ${JSON.stringify(res.body)}`);
                    done();
                });;
        });
    });

    const participantInfo = [
        {

            "name": {
                "first": "Carol",
                "last": "MacDonald"
            },
            "team": "USA"
        },
        {

            "name": {
                "first": "Nicola",
                "last": "Mills"
            },
            "team": "Canada"
        },
        {

            "name": {
                "first": "Sophie",
                "last": "Carr"
            },
            "team": "Ireland"
        },
        {

            "name": {
                "first": "Elizabeth",
                "last": "Terry"
            },
            "team": "France"
        },
        {

            "name": {
                "first": "Jasmine",
                "last": "Parsons"
            },
            "team": "Japan"
        },
        {

            "name": {
                "first": "Sarah",
                "last": "Taylor"
            },
            "team": "Italy"
        },
        {

            "name": {
                "first": "Anna",
                "last": "Mitchell"
            },
            "team": "Ukraine"
        },
        {

            "name": {
                "first": "Julia",
                "last": "Blake"
            },
            "team": "Russia"
        },
        {

            "name": {
                "first": "Leah",
                "last": "Newman"
            },
            "team": "Israel"
        },
        {

            "name": {
                "first": "Alexandra",
                "last": "Sharp"
            },
            "team": "Greece"
        }
    ];

    async function loadParticipants() {
        try {
            await participantInfoModel.deleteMany();
            // insertMany & insertOne functions get around auto increment in mongoose-sequence, use create instead
            //await participantInfoModel.collection.insertMany(participantInfo);
            await participantInfoModel.create(participantInfo);
            console.info(`${participantInfo.length} participants were successfully stored.`);
        } catch (err) {
            console.error(`failed to Load Participant Info Data: ${err}`);
        }
    }
});
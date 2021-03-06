import seed from '../../../seed';
import { app } from '../../../index.js';
const should = require('should');
const request = require('supertest');
//const requestTestAccessToken = require('../../getTestAccessToken');
import requestTestAccessToken from '../../getTestAccessToken';

let testAccessToken;
let callback = (error, response, body) => {
    console.log(`callback starts!`);
    if (error) throw new Error(error);

    testAccessToken = body;
    //console.log(testAccessToken);
};

describe('participants', () => {
    before(async () => {
        //console.log(`test participants.index before starts`);
        await requestTestAccessToken.getTestToken(callback);
        await seed();
        //console.log(`testaccesstoken: ${testAccessToken.token_type} ${testAccessToken.access_token}`);
        //console.log(`test participants.index before ends`);
    });

    describe('GET participants', () => {
        it('should get all participants', (done) => {
            request(app)
                .get('/api/participants')
                //.expect(200)
                .then(res => {
                    console.log(`GET participants test is before assertions response body: ${JSON.stringify(res.body)}`);
                    // HTTP status should be 200
                    res.should.have.property('status').equal(200);
                    //res.body.length.should.be.above(0);
                    console.log(`GET participants test is completed response body: ${JSON.stringify(res.body)}`);
                    done();
                });;
        });
    });

    describe('GET participant by id', () => {
        it('should get one participant by id', (done) => {
            request(app)
                .get('/api/participants/1')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 200
                    res.should.have.property('status').equal(200);
                    res.body.should.have.property('id');
                    res.body.id.should.equal(1);
                    console.log(`should GET one participant is completed, response body: ${JSON.stringify(res.body)}`);
                    done();
                });
        });

        it('should NOT get one participant by id', (done) => {
            request(app)
                .get('/api/participants/-1')
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
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
        let invalidParticipantNoFirstName = {
            "name": {
                "last": "MacDonald"
            },
            "team": "USA"
        };

        it('should POST one participant', (done) => {
            request(app)
                .post('/api/participants')
                .send(participant1)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)

                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 201
                    console.log(`should POST one participant before assertions, response header: ${res.header}`);
                    console.log(`should POST one participant before assertions, response info: ${res.info}`);
                    console.log(`should POST one participant before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(201);
                    res.body.should.have.property('id');
                    res.body.name.first.should.equal('Carol');
                    done();
                });

        });
        it('should fail with 401 UnauthorizedError when POSTing participant', (done) => {
            request(app)
                .post('/api/participants')
                .send(participant1)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qWTFNVUkzTkVFMU16YzJNMFl6TURkRE1rUkNPREk1UkVKR00wSkNPVGN5TmpSR00wUkdPUSJ9.eyJpc3MiOiJodHRwczovL2Fib3Jza2l5LmF1dGgwLmNvbS8iLCJzdWIiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5a0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hYm9yc2tpeS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU1NDk0OTM5OCwiZXhwIjoxNTU1MDM1Nzk4LCJhenAiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5ayIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.fvhiPoafkCYU_aEaQH1D7PJFVzNc7A3bVCyhrx_qjWUEnhHwBYll8hKWiU1A5xLV_8xktGtBJ1BFxeOrKdXJssjbSCHodShOxRzqbORDGE_Eppds1yS4WSH4ecwZ0YMovnPT_j99iP0Zcw9VB9MrMmxZLHkqtbl2ObPXvwb53eJ9Tps_Il-fwSUfV-aGyO7qqRPE5k3Qk75Q9s9RelXU9xNtpdnnrK9q2mqTaXlpVlQPsg_wbaNqBpgh9RDE9smXIsQE5NH79EbZZg4YAlVOAnSzW5R1V1K-pxSXvKjUaq6asGCIqA1Q4HgYImfj-N_4J6dHffLNMgIpnXm3EYaXkg')
                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 401
                    console.log(`should POST one participant before assertions, response header: ${res.header}`);
                    console.log(`should POST one participant before assertions, response info: ${res.info}`);
                    console.log(`should POST one participant before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(401);
                    //res.body.should.have.property('id');
                    res.body.should.equal('UnauthorizedError');
                    done();
                });

        });
        it('should fail validation before POSTing participant with \'first name does not exist\' error', (done) => {
            request(app)
                .post('/api/participants')
                .send(invalidParticipantNoFirstName)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 201
                    console.log(`should POST one participant before assertions, response header: ${res.header}`);
                    console.log(`should POST one participant before assertions, response info: ${res.info}`);
                    console.log(`should POST one participant before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(422);
                    res.body.should.be.instanceof(Array).and.have.lengthOf(1);

                    //res.body.should.have.property('param');
                    //res.body.param.should.equal('name.first');
                    //res.body.should.have.property('msg');
                    //res.body.msg.should.equal('first name does not exist');
                    //res.body.name.first.should.equal('Carol');
                    done();
                });

        });
    });
    describe('PUT participant', () => {
        let participant1 = {
            "name": {
                "first": "Carol",
                "last": "MacDonald"
            },
            "team": "USA"
        };
        let invalidParticipantNoLastName = {
            "name": {
                "first": "Carol"
            },
            "team": "USA"
        };

        it('should PUT one participant', (done) => {
            request(app)
                .put('/api/participants/1')
                .send(participant1)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should PUT one participant before assertions, response header: ${res.header}`);
                    console.log(`should PUT one participant before assertions, response info: ${res.info}`);
                    console.log(`should PUT one participant before assertions, response body: ${JSON.stringify(res.body)}`);
                    console.log(`should PUT one participant before assertions, response body name first: ${res.body.name.first}`);
                    res.should.have.property('status').equal(200);
                    res.body.should.have.property('id');
                    res.body.name.first.should.equal('Carol');
                    done();
                });

        });
        it('should fail finding PUT request without param id with 404', (done) => {
            request(app)
                .put('/api/participants')
                .send(participant1)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should POST one participant before assertions, response header: ${res.header}`);
                    console.log(`should POST one participant before assertions, response info: ${res.info}`);
                    console.log(`should POST one participant before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(404);
                    done();
                });
        });
        it('should fail PUT request validation with not numeric id parameter', (done) => {
            request(app)
                .put('/api/participants/fake')
                .send(participant1)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should POST one participant before assertions, response header: ${res.header}`);
                    console.log(`should POST one participant before assertions, response info: ${res.info}`);
                    console.log(`should POST one participant before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(422);
                    res.body.should.be.instanceof(Array).and.have.lengthOf(1);
                    done();
                });
        });
    });

    describe('DELETE participant', () => {
        it('should DELETE one participant', (done) => {
            request(app)
                .delete('/api/participants/1')
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should DELETE one participant before assertions, response header: ${res.header}`);
                    console.log(`should DELETE one participant before assertions, response info: ${res.info}`);
                    console.log(`should DELETE one participant before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(200);
                    res.body.should.have.property('id');
                    res.body.name.first.should.equal('Carol');
                    done();
                });

        });
    });
});
import seed from '../../../seed';
import { app } from '../../../index.js';
const should = require('should');
const request = require('supertest');
import requestTestAccessToken from '../../getTestAccessToken';


let testAccessToken;
let callback = (error, response, body) => {
    console.log(`callback starts!`);
    if (error) throw new Error(error);

    testAccessToken = body;
    //console.log(testAccessToken);
};

describe('scores', () => {
    before(async () => {
        try {
            console.log(`test scores before starts`);
            await requestTestAccessToken.getTestToken(callback);
            await seed();
            //console.log(`testaccesstoken: ${testAccessToken.token_type} ${testAccessToken.access_token}`);
            console.log(`test scores before ends`);

        }
        catch (e) {
            console.log(`test scores before exception is caught: ${e} `);
        }
    });

    describe('GET scores', () => {
        it('should get all scores', (done) => {
            request(app)
                .get('/api/scores')
                //.expect(200)
                .then(res => {
                    console.log(`GET scores test is before assertions response body: ${JSON.stringify(res.body)}`);
                    // HTTP status should be 200
                    res.should.have.property('status').equal(200);
                    res.body.length.should.be.above(0);
                    //res.body.length.should.be.above(0);
                    console.log(`GET scores test is completed response body: ${JSON.stringify(res.body)}`);
                    done();
                });;
        });
    });


    describe('POST scores', () => {
        let score1 = {
            "id": 901,
            "name": "Carol MacDonald",
            "team": "USA",
            "scores": [
                { "id": "floor", "diff": 0, "exec": 0, "deduct": 0, "total": 0 },
                { "id": "rope", "diff": 0, "exec": 0, "deduct": 0, "total": 0 },
                { "id": "hoop", "diff": 0, "exec": 0, "deduct": 0, "total": 0 },
                { "id": "ribbon", "diff": 0, "exec": 0, "deduct": 0, "total": 0 }
            ],
            "total": 0
        };
        let invalidScoreNoScores = {
            "id": 901,
            //"name": "Carol MacDonald",
            "team": "USA",
            "total": 0
        };

        it('should fail with 401 UnauthorizedError when POSTing participant', (done) => {
            request(app)
                .post('/api/scores')
                .send(score1)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qWTFNVUkzTkVFMU16YzJNMFl6TURkRE1rUkNPREk1UkVKR00wSkNPVGN5TmpSR00wUkdPUSJ9.eyJpc3MiOiJodHRwczovL2Fib3Jza2l5LmF1dGgwLmNvbS8iLCJzdWIiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5a0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hYm9yc2tpeS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU1NDk0OTM5OCwiZXhwIjoxNTU1MDM1Nzk4LCJhenAiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5ayIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.fvhiPoafkCYU_aEaQH1D7PJFVzNc7A3bVCyhrx_qjWUEnhHwBYll8hKWiU1A5xLV_8xktGtBJ1BFxeOrKdXJssjbSCHodShOxRzqbORDGE_Eppds1yS4WSH4ecwZ0YMovnPT_j99iP0Zcw9VB9MrMmxZLHkqtbl2ObPXvwb53eJ9Tps_Il-fwSUfV-aGyO7qqRPE5k3Qk75Q9s9RelXU9xNtpdnnrK9q2mqTaXlpVlQPsg_wbaNqBpgh9RDE9smXIsQE5NH79EbZZg4YAlVOAnSzW5R1V1K-pxSXvKjUaq6asGCIqA1Q4HgYImfj-N_4J6dHffLNMgIpnXm3EYaXkg')
                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 401
                    console.log(`should POST one score before assertions, response header: ${res.header}`);
                    console.log(`should POST one score before assertions, response info: ${res.info}`);
                    console.log(`should POST one score before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(401);
                    res.body.should.equal('UnauthorizedError');
                    done();
                });

        });
        it('should fail validation before POSTing score with \'4 scores must be present\' error', (done) => {
            request(app)
                .post('/api/scores')
                .send(invalidScoreNoScores)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 201
                    console.log(`should POST one score before assertions, response header: ${res.header}`);
                    console.log(`should POST one score before assertions, response info: ${res.info}`);
                    console.log(`should POST one score before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(422);
                    res.body[0].msg.should.equal('name does not exist');
                    res.body[3].msg.should.equal('4 scores must be present');

                    done();
                });

        });

        it('should POST one score', (done) => {
            request(app)
                .post('/api/scores')
                .send(score1)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)

                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 201
                    console.log(`should POST one score before assertions, response header: ${res.header}`);
                    console.log(`should POST one score before assertions, response info: ${res.info}`);
                    console.log(`should POST one score before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(201);
                    res.body.should.have.property('id');
                    res.body.scores.should.be.instanceof(Array).and.have.lengthOf(4);
                    res.body.name.should.equal('Carol MacDonald');
                    done();
                });

        });
    });

    describe('PUT participant', () => {
        let score1 = {
            "id": 901,
            "name": "Carol MacDonald",
            "team": "USA",
            "scores": [
                { "id": "floor", "diff": 9.0, "exec": 9.0, "deduct": 0, "total": 18.0 },
                { "id": "rope", "diff": 0, "exec": 0, "deduct": 0, "total": 0 },
                { "id": "hoop", "diff": 0, "exec": 0, "deduct": 0, "total": 0 },
                { "id": "ribbon", "diff": 0, "exec": 0, "deduct": 0, "total": 0 }
            ],
            "total": 0
        };
        
        it('should PUT one score', (done) => {
            request(app)
                .put('/api/scores/901')
                .send(score1)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should PUT one score before assertions, response header: ${res.header}`);
                    console.log(`should PUT one score before assertions, response info: ${res.info}`);
                    console.log(`should PUT one score before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(200);
                    res.body.should.have.property('id');
                    res.body.scores.should.be.instanceof(Array).and.have.lengthOf(4);
                    res.body.name.should.equal('Carol MacDonald');
                    done();
                });

        });
        it('should fail finding PUT request without param id with 404', (done) => {
            request(app)
                .put('/api/scores')
                .send(score1)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should POST one score before assertions, response header: ${res.header}`);
                    console.log(`should POST one score before assertions, response info: ${res.info}`);
                    console.log(`should POST one score before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(404);
                    done();
                });
        });
        it('should fail PUT request validation with not numeric id parameter', (done) => {
            request(app)
                .put('/api/scores/fake')
                .send(score1)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should POST one score before assertions, response header: ${res.header}`);
                    console.log(`should POST one score before assertions, response info: ${res.info}`);
                    console.log(`should POST one score before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(422);
                    res.body.should.be.instanceof(Array).and.have.lengthOf(1);
                    done();
                });
        });
    });

    describe('DELETE score', () => {
        it('should DELETE one score', (done) => {
            request(app)
                .delete('/api/scores/901')
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should DELETE one score before assertions, response header: ${res.header}`);
                    console.log(`should DELETE one score before assertions, response info: ${res.info}`);
                    console.log(`should DELETE one score before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(200);
                    res.body.should.have.property('id');
                    res.body.scores.should.be.instanceof(Array).and.have.lengthOf(4);
                    res.body.name.should.equal('Carol MacDonald');
                    done();
                });

        });
    });
});
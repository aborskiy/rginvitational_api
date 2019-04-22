import seed from '../../../seed';
import { app } from '../../../index.js';
import rotationEntryModel from '../../../api/models/rotationEntryModel';
const should = require('should');
const request = require('supertest');
const requestTestAccessToken = require('../../getTestAccessToken');

console.log(`test rotationentries is starting!!! `);

let testAccessToken;
let callback = (error, response, body) => {
    console.log(`callback starts!`);
    if (error) throw new Error(error);

    testAccessToken = body;
    console.log(testAccessToken);
};

describe('rotationentries', () => {
    console.log(`inside describe rotationentries`);
    before(async () => {
        try {
            console.log(`test rotationentries before starts`);
            await requestTestAccessToken.getTestToken(callback);
            await seed();
            //console.log(`testaccesstoken: ${testAccessToken.token_type} ${testAccessToken.access_token}`);
            console.log(`test rotationentries before ends`);

        }
        catch (e) {
            console.log(`test rotationentries before exception is caught: ${e} `);
        }
    });

    let rotationEntry = {};
    let invalidRotationEntry = {};
    beforeEach(() => {
        rotationEntry = {
            "rotaId": 1,
            "participantId": 908,
            "name": "Julia B",
            "team": "RUS",
            "apparatus": {
                "id": "floor",
                "imageurl": "images/floor-min-2.png"
            },
            "score": {
                "id": "floor",
                "diff": 9.3,
                "exec": 9,
                "deduct": 0.1,
                "total": 18.2
            }
        };
        invalidRotationEntry = {
            "rotaId": 1,
            "participantId": 908,
            "team": "RUS",
            "apparatus": {
                "id": "dummy",
                "imageurl": "images/floor-min-2.png"
            },
            "score": {
                "id": "floor",
                "diff": 9.3,
                "exec": 9,
                "deduct": 0.1,
                "total": 18.2
            }
        };
    });
    describe('GET rotationentries', () => {
        it('should get all rotationentries', (done) => {
            request(app)
                .get('/api/rotationentries')
                //.expect(200)
                .then(res => {
                    console.log(`GET rotationentries test is before assertions response body: ${JSON.stringify(res.body)}`);
                    // HTTP status should be 200
                    res.should.have.property('status').equal(200);
                    res.body.length.should.be.above(0);
                    //res.body.length.should.be.above(0);
                    console.log(`GET rotationentries test is completed response body: ${JSON.stringify(res.body)}`);
                    done();
                });;
        });
    });

    describe('POST rotationentries', () => {

        it('should fail with 401 UnauthorizedError when POSTing rotation entry', (done) => {
            request(app)
                .post('/api/rotationentries')
                .send(rotationEntry)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qWTFNVUkzTkVFMU16YzJNMFl6TURkRE1rUkNPREk1UkVKR00wSkNPVGN5TmpSR00wUkdPUSJ9.eyJpc3MiOiJodHRwczovL2Fib3Jza2l5LmF1dGgwLmNvbS8iLCJzdWIiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5a0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hYm9yc2tpeS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU1NDk0OTM5OCwiZXhwIjoxNTU1MDM1Nzk4LCJhenAiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5ayIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.fvhiPoafkCYU_aEaQH1D7PJFVzNc7A3bVCyhrx_qjWUEnhHwBYll8hKWiU1A5xLV_8xktGtBJ1BFxeOrKdXJssjbSCHodShOxRzqbORDGE_Eppds1yS4WSH4ecwZ0YMovnPT_j99iP0Zcw9VB9MrMmxZLHkqtbl2ObPXvwb53eJ9Tps_Il-fwSUfV-aGyO7qqRPE5k3Qk75Q9s9RelXU9xNtpdnnrK9q2mqTaXlpVlQPsg_wbaNqBpgh9RDE9smXIsQE5NH79EbZZg4YAlVOAnSzW5R1V1K-pxSXvKjUaq6asGCIqA1Q4HgYImfj-N_4J6dHffLNMgIpnXm3EYaXkg')
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 401
                    console.log(`should POST one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should POST one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should POST one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(401);
                    res.body.should.equal('UnauthorizedError');
                    done();
                });

        });
        it('should fail validation before POSTing rotationentries with \'apparatus id is invalid\' error', (done) => {
            request(app)
                .post('/api/rotationentries')
                .send(invalidRotationEntry)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 201
                    console.log(`should POST one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should POST one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should POST one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(422);
                    res.body.length.should.be.above(0);
                    res.body[0].msg.should.equal('name does not exist');
                    res.body[1].msg.should.equal('apparatus id is invalid, should be floor, hoop, rope, ribbon');

                    done();
                });

        });

        it('should POST one rotationentry', (done) => {
            request(app)
                .post('/api/rotationentries')
                .send(rotationEntry)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)

                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 201
                    console.log(`should POST one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should POST one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should POST one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(201);
                    res.body.should.have.property('rotaId');
                    res.body.name.should.equal(rotationEntry.name);
                    done();
                });

        });
    });

    describe('PUT rotationentry', () => {
        it('should PUT one rotationentry', (done) => {
            request(app)
                .put('/api/rotationentries/1')
                .send(rotationEntry)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should PUT one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should PUT one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should PUT one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(200);
                    res.body.should.have.property('rotaId');
                    res.body.rotaId.should.equal(rotationEntry.rotaId);
                    res.body.name.should.equal(rotationEntry.name);
                    done();
                });

        });
        it('should fail finding PUT request without param id with 404', (done) => {
            request(app)
                .put('/api/rotationentries')
                .send(rotationEntry)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should PUT one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should PUT one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should PUT one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(404);
                    done();
                });
        });
        it('should fail PUT request validation with not numeric id parameter', (done) => {
            request(app)
                .put('/api/rotationentries/fake')
                .send(rotationEntry)
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should PUT one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should PUT one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should PUT one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(422);
                    res.body.should.be.instanceof(Array).and.have.lengthOf(1);
                    done();
                });
        });
    });

    describe('DELETE rotationentry', () => {
        it('should DELETE one rotationentry', (done) => {
            request(app)
                .delete('/api/rotationentries/1')
                .set('Accept', 'application/json')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)
                //.expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(`should DELETE one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should DELETE one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should DELETE one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(200);
                    res.body.should.have.property('rotaId');
                    res.body.rotaId.should.equal(rotationEntry.rotaId);
                    res.body.name.should.equal(rotationEntry.name);
                    done();
                });

        });
    });
});


describe('rotationentries bulk', () => {
    describe('POST rotationentries BULK', () => {
        it('should POST BULK rotationentries', (done) => {
            request(app)
                .post('/api/rotationentries')
                .send(rotationEntry)
                .set('Accept', 'application/json')
                .set('X-Action', 'bulk')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)

                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 201
                    console.log(`should POST one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should POST one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should POST one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(201);
                    //res.body.should.have.property('rotaId');
                    //res.body.name.should.equal(rotationEntry.name);
                    done();
                });

        });

    });

    describe('DELETE rotationentries BULK', () => {
        it('should DELETE BULK rotationentries', (done) => {
            request(app)
                .delete('/api/rotationentries')
                .send(rotationEntry)
                .set('Accept', 'application/json')
                .set('X-Action', 'bulk')
                .set('Authorization', `${testAccessToken.token_type} ${testAccessToken.access_token}`)

                //.expect('Content-Type', /json/)
                //.expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 200
                    console.log(`should POST one rotationentry before assertions, response header: ${res.header}`);
                    console.log(`should POST one rotationentry before assertions, response info: ${res.info}`);
                    console.log(`should POST one rotationentry before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(200);
                    //res.body.should.have.property('rotaId');
                    //res.body.name.should.equal(rotationEntry.name);
                    done();
                });

        });

    });


});
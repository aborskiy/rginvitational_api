import seed from '../../../seed';
import { app } from '../../../index.js';
import participantInfoModel from '../../../api/participants/participantInfoModel';
const should = require('should');
const request = require('supertest');


describe('participants', () => {

    before(async () => {
        console.log(`test participants.index before starts`);
        await seed();
        console.log(`test participants.index before ends`);
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
        it('should POST one participant', (done) => {
            request(app)
                .post('/api/participants')
                .send(participant1)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qWTFNVUkzTkVFMU16YzJNMFl6TURkRE1rUkNPREk1UkVKR00wSkNPVGN5TmpSR00wUkdPUSJ9.eyJpc3MiOiJodHRwczovL2Fib3Jza2l5LmF1dGgwLmNvbS8iLCJzdWIiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5a0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hYm9yc2tpeS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU1NDY2OTIwNCwiZXhwIjoxNTU0NzU1NjA0LCJhenAiOiJCWnI0V3pBTTZWbzBLSFY2YnlObDZZYlZqNVlXTTF5ayIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AoRd5lceOCaq3D614UfzRMo5gSs_OHRgw79N5Xno-eSq2wjrn1m5zyK37lxUCXwqh0qjk39NSl2fFMMYo783MreL7e2rH3cxZsir4H5EsuhMzfe9-UXqW84w8ukl7mZ8mrc-Vd5yPkijHmxvZstN74UjGyjJTY2w9slhbu7g2dgtjB7R7UvDVjLfAo48Zb0XlUJUZ7VNPmcsKyK-pGBhhY9vs-sON5wGGUeBJYIau7mKYyvh7P8HBSfju3zx8ovXgtGr9hCclGXs6aQ1EsiSAS2nnVw9MUwsfi_bv2Xw-0esNnLXWaS-EgudjTdZOpGpZtnkj4ruDeVuwc2uXqtuyQ')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // HTTP status should be 201
                    console.log(`should POST one participant before assertions, response body: ${JSON.stringify(res.body)}`);
                    res.should.have.property('status').equal(201);
                    res.body.should.have.property('id');
                    res.body.name.first.should.equal('Carol');
                    done();
                });

        });
    });
});
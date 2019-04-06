import { app } from './../index.js';
const should = require('should');
const request = require('supertest');

describe('participants', () => {
    //this.timeout(120000);
    describe('GET participants', () => {
        it('should get all participants', (done) => {
            request(app)
                .get('/api/participants')
                .expect(200)
                .then(res => {
                    // HTTP status should be 200
                    res.should.have.property('status').equal(200);
                    done();
                });;
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
                    done();
                });;
        });
    });
});
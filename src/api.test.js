const request = require('supertest');
const app = require('./index');


describe('API', function () {
    it('GET /ping health status check', function (done) {
        request(app)
            .get('/ping')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,
            {
                ping: 'pong'
            },done);
    });
});


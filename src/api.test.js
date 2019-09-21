const { Pool } = require('pg');
const request = require('supertest');
const app = require('./index');
const { expect } = require('chai');
const knex = require('knex')({
    client: 'pg',
    connection: 'postgresql://postgres:postgres@postgres:5432/gymbuddy_test',
});

before(async () => {
    const pool = new Pool({
        connectionString:  'postgresql://postgres:postgres@postgres:5432/gymbuddy'
    });
    await pool.query('DROP DATABASE IF EXISTS gymbuddy_test');
    await pool.query('CREATE DATABASE gymbuddy_test;');
    await knex.migrate.latest()
        .then(async function() {
            return await knex.seed.run();
        })
        .then(function() {
            // migrations are finished
        });
});

describe('API', function () {

    it('Health status check', function (done) {
        request(app)
            .get('/ping')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,
                {
                    ping: 'pong'
                },done);
    });

    it('Return all exercises for day 1', function (done) {
        request(app)
            .get('/api/v1/exercises/by_day/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(r => {
                expect(r.body).to.be.a('array');
                expect(r.body).to.have.lengthOf(9);
                expect(r.body[0].id).to.be.a('number');
                expect(r.body[1].title).to.be.a('string');
                expect(r.body[2].img_url).to.be.a('string');
            })
            .expect(200, done);
    });

    it('Return one exercise instance by exercise ID', function (done) {
        request(app)
            .get('/api/v1/exercises/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(r => {
                expect(r.body).to.be.a('array');
                expect(r.body).to.have.lengthOf(1);
                expect(r.body[0].id).to.be.a('number');
                expect(r.body[0].title).to.be.a('string');
                expect(r.body[0].img_url).to.be.a('string');
                expect(r.body[0].id).to.equal(1);
                expect(r.body[0].title).to.equal('Lower back bench');
            })
            .expect(200, done);
    });

});


const { Pool } = require('pg');
const request = require('supertest');
const dotenv = require('dotenv').config();
const app = require('./index');
const { expect } = require('chai');
const knex = require('knex')({
    client: 'pg',
    connection: process.env.DB_CONNECTION_TEST,
});
const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_DEV
});

before(async () => {
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

describe('API', () => {

    it('Health status check',  done => {
        request(app)
            .get('/ping')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,
                {
                    ping: 'pong'
                },done);
    });

    it('Return all exercises for day 1', done => {
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

    it('Return one exercise instance by exercise ID',  done => {
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

    describe('Sets', () => {

        it('Get all sets for exercise 1', done => {
            request(app)
                .get('/api/v1/sets/by_exercise/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(r => {
                    expect(r.body).to.be.a('array');
                    expect(r.body).to.have.lengthOf(1);
                    expect(r.body[0].weight).equal(30);
                })
                .expect(200, done);
        });

        it('Add a set', done => {
             request(app)
                .post('/api/v1/sets')
                .set('Accept', 'application/json')
                .send({
                    exerciseId: 1,
                    repetitions: 15,
                    weight: 30,
                    rating: 1,
                    createdBy: 'me'
                })
                .expect('Content-Type', /json/)
                .expect(r => {
                    expect(r.body.status).to.equal('success');
                })
                .expect(201, done);
        });

        it('Get last weight for exercise 1', done => {
            request(app)
                .get('/api/v1/exercises/1/last_weight')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(r => {
                    expect(r.body[0].weight).equal(30);
                })
                .expect(200, done);
        });

        it('Return empty array for last weight for exercise 2', done => {
            request(app)
                .get('/api/v1/exercises/2/last_weight')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(r => {
                    expect(r.body).to.be.a('array');
                    expect(r.body).to.have.lengthOf(0);
                })
                .expect(200, done);
        });

    });

});

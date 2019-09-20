const Request = require("request");
const { Pool } = require('pg');

describe("Server", () => {
    let server;
    beforeAll(async () => {
        const pool = new Pool({
            connectionString:  'postgresql://postgres:postgres@postgres:5432/gymbuddy'
        });
        await pool.query('DROP DATABASE IF EXISTS gymbuddy_test').then(e=>{
            console.log('++++++++ droped /////');
        });
        await pool.query('CREATE DATABASE gymbuddy_test;').then(e=>{
            console.log('++++++++ created ////');
        });
        await server = require("../index");
    });
    afterAll(() => {
        server.close();
    });
    describe("GET /api/v1/sets", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1337/api/v1/exercises/by_day/1", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body).toEqual('[{"id":1,"title":"e1","img_url":"xxx"}]');
        });
    });
});

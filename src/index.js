const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const environment = process.env.NODE_ENV || 'dev';  // dev, test
console.log(`++ ${environment} ++`);

if (dotenv.error) {
    throw dotenv.error
}

const pool = new Pool({
    connectionString:  (environment === 'test') ? process.env.DB_CONNECTION_TEST : process.env.DB_CONNECTION_DEV
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// just for simple testing
app.get('/ping', (req, res) => {
    res.status(200).json({ping: 'pong'});
});

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256']
});
// ignore Auth header for tests
if (environment !== 'test') {
    app.use(checkJwt);
    app.use(morgan('combined'));
}

app.get('/api/v1/exercises/by_day/:day', async (req, res, next) => {
    const day = parseInt(req.params.day);
    try {
        let resultExercises = await pool.query('SELECT id, title, img_url FROM exercise WHERE day = $1 ORDER BY title', [day]);
        let exercises = resultExercises.rows;
        await Promise.all(exercises.map(async e => {
            let resultSetToday = await pool.query('SELECT count(id) as cnt FROM set WHERE set.exercise_id = $1 AND created_at >= now()::date', [e.id]);
            e.today_train = (resultSetToday.rows[0].cnt > 0);
        }));
        res.status(200).json(exercises);
    } catch (error) {
        next(error);
    }
});

app.get('/api/v1/exercises/:exerciseId', (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    pool.query('SELECT id, title, img_url, day FROM exercise WHERE id = $1 ORDER BY title', [exerciseId], (error, results) => {
        if (error) { next(error); }
        res.status(200).json(results.rows);
    });
});

app.get('/api/v1/sets/by_exercise/:exerciseId', (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    pool.query('SELECT id, repetitions, weight, rating, created_by, created_at FROM set WHERE exercise_id = $1 ORDER BY created_at DESC LIMIT 6', [exerciseId], (error, results) => {
        if (error) { next(error); }
        res.status(200).json(results.rows);
    });
});

app.get('/api/v1/exercises/:exerciseId/last_weight', (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    pool.query('SELECT weight, repetitions FROM set WHERE exercise_id = $1 AND rating = 1 ORDER BY created_at DESC LIMIT 1', [exerciseId], (error, results) => {
        if (error) { next(error); }
        res.status(200).json(results.rows);
    });
});

app.post('/api/v1/sets', (req, res) => {
    const { exerciseId, repetitions, weight, rating, createdBy } = req.body;
    pool.query('INSERT INTO set (exercise_id, repetitions, weight, rating, created_by) VALUES ($1, $2, $3, $4, $5)', [exerciseId, repetitions, weight, rating, createdBy], (error, results) => {
        if (error) { next(error); }
        res.status(201).json({ status: 'success', message: 'Set added.' });
    })
});

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send('Server error!');
});

const serverPort = (environment === 'test') ? process.env.APP_PORT_TEST : process.env.APP_PORT_DEV;
app.listen(serverPort, () => {
    console.log(`listening on port ${serverPort}`);
});

module.exports = app;

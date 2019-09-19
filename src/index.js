const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

if (dotenv.error) {
    throw dotenv.error
}

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('connected to the db');
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

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
app.use(checkJwt);

app.get('/api/v1/exercises/by_day/:day', (req, res) => {
    const day = parseInt(req.params.day);
    pool.query('SELECT id, title, imgUrl FROM exercise WHERE day = $1 ORDER BY title', [day], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    });
});

app.get('/api/v1/exercises/:excerciseId', (req, res) => {
    const excerciseId = parseInt(req.params.excerciseId);
    pool.query('SELECT id, title, imgUrl, day FROM exercise WHERE id = $1 ORDER BY title', [excerciseId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    });
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});

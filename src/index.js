const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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
        jwksUri: 'https://gymbuddy.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://gymbuddy.com',
    issuer: 'https://gymbuddy.eu.auth0.com/',
    algorithms: ['RS256']
});
app.use(checkJwt);

app.get('/',(req, res) => {
    res.send('Hello world');
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});

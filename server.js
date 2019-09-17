const express = require('express');
const cors = require('cors');

const Authentication = require("./auth/routes.js");
const UserRouter = require('./users/userRouter.js');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('./data/dbConfig.js')

const sessionConfig = {
    name: 'chocochip', // would name the cookie sid by default
    secret: 'process.env.SESSION_SECRET' || 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000 * 60 * 60, // in milliseconds
        secure: false, // true means only send cookie over HTTPS
        httpOnly: true, // true means JS has no access to the cookie
    },
    resave: false,
    saveUninitialized: true, //GDPR compliance
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: 'knexsessions',
        sidfieldname: 'sessionid',
        createtable: true,
        clearInterval: 1000 * 60 * 30, // clean out expired session data
    })
};

const server = express();
server.use(cors());
server.use(session(sessionConfig));

server.use(express.json());
server.use('/api/users', UserRouter);
server.use('/api', Authentication);

module.exports = server;
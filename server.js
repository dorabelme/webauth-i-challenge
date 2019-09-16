const express = require('express');
const cors = require('cors');

const Authentication = require("./auth/routes.js");
const UserRouter = require('./users/userRouter.js');

const server = express();
server.use(cors());

server.use(express.json());
server.use('/api/users', UserRouter);
server.use('/api', Authentication);

module.exports = server;
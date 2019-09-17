const express = require('express')
// const bcrypt = require('bcryptjs');
const session = require('express-session');

// const Users = require('../users/user-model.js');


function restricted(req, res, next) {
    console.log(req.session);
    // read the username and password from headers
    // client is responsible for setting those headers
    // const { username, password } = req.headers;

    // if (username && password) {
    //     Users.findBy({ username })
    //         .first()
    //         .then(user => {
    //             if (user && bcrypt.compareSync(password, user.password)) {
    //                 next();
    //             } else {
    //                 res.status(401).json({ message: 'Invalid Credentials' });
    //             }
    //         })
    //         .catch(error => {
    //             res.status(500).json({ message: 'Unexpected error' });
    //         });
    // } else {
    //     res.status(400).json({ message: 'No credentials provided' });
    // }

    // is the user logged in === do we have information about the user in our session
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'You shall not pass.' });
    }
};

module.exports = restricted;
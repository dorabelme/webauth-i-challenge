const express = require('express')
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

const router = express.Router();
const Users = require('../users/user-model.js');
const dbConnection = require('../data/dbConfig.js')




router.post('/register', (req, res) => {
    let { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 8)

    Users.add({ username, password: hash })
        .then(user => {
            req.session.user = user;
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({ message: 'could not logged out' })
            } else {
                res.status(200).json({ message: 'bye' })
            }
        });
    } else {
        res.status(200).json({ message: 'already logged out' })
    }
}) 


module.exports = router;
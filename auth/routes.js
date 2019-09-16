const express = require('express')
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

const router = express.Router();
const Users = require('../users/user-model.js');


router.post('/register', (req, res) => {
    let { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 8)

    Users.add({ username, password: hash })
        .then(saved => {
            res.status(201).json(saved);
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
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'You cannot pass' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


module.exports = router;
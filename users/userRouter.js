const express = require('express');

const Users = require('./user-model.js');
const router = express.Router();


const restricted = require("../auth/restricted-middleware.js");


router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            console.log(users);
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.get('/hash', (req, res) => {
    const name = req.query.name;

    // hash the name
    const hash = bcrypt.hashSync(name, 14);
    req.query.name = hash; // use bcrypt to hash the name

    res.send(`the hash for ${name} is ${hash}`);
})





module.exports = router;

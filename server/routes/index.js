const express = require("express");
const conn = require('../configs/config_aws');
router = express.Router();

router.get('/register', (req, res, next) => {
    res.render('register');
});

router.get('/login', (req, res, next) => {
    res.render("login");
});

router.get('/food', (req, res, next) => {
    res.render('food');
});

router.get('/addfood', (req, res, next) => {
    res.render('addfood');
});

router.get('/profile', (req, res, next) => {
    res.render('profile')
});


exports.router = router;
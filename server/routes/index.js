const express = require("express");
const conn = require('../configs/config_aws');
router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('home')
});

router.get('/table/food', (req, res, next) =>{
    res.render('tableFood.ejs');
});

router.get('/register',(req,res,next) => {
    res.render('register');
});

exports.router = router;
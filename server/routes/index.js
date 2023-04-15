const express = require("express");
const conn = require('../configs/config_aws');

router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('home')
});



exports.router = router;
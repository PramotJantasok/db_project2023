const express = require("express");
const conn = require('../configs/config_aws');

router = express.Router();

function dataTime(){
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    console.log(yyyy+'-'+mm+'-'+dd)
    return yyyy+'-'+mm+'-'+dd;
}

router.get('/table/food', (req, res, next) =>{
    var time = Date();
    console.log(time);
    res.render('tableFood.ejs');
});

exports.router = router;
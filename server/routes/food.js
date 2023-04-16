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

router.get('/table/food', async (req, res, next) =>{
    const time = dataTime();
    const [row, field] = await conn.query('select * from DAILY where user_id = ?, daily_date = ?',[
        1, time
    ])
    res.render('tableFood.ejs', {data: row[0]});
});

router.get('/table/food/history'), async (req, res, next) =>{
    
    const [row, field] = await conn.query('select * from DAILY where user_id = ?');
    const [row2, filed2] = await conn.query('select * from MEAL_FOOD where user_id = ?')
    const [row3, filed3] = await conn.query('select * from food');
    res.render('')
}

exports.router = router;
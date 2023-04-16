const express = require("express");
const conn = require('../configs/config_aws');

router = express.Router();

function dataTime() {
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
    console.log(yyyy + '-' + mm + '-' + dd)
    return yyyy + '-' + mm + '-' + dd;
}

router.get('/table/food', async (req, res, next) => {
    const time = dataTime();
    const id = req.get("Cookie").split('token=')[1].trim();
    const [row, field] = await conn.query('select * from DAILY where user_id = ?, daily_date = ?', [
        id, time
    ])

    if (row.length == 0) {
        const create = await conn.query('insert into DAILY(daily_date, user_id) valuse(?,?)', [
            time, id
        ])
        console.log(create.insertId)
        // const [newDialy, field] = await conn.query('select * from DAILY where user_id = ?, daily_date = ?',[
        //     id, time
        // ]);

        const [daily, filed2] = await conn.query('select * from MEAL left outer join MEAL_FOOD using(meal_id) where daily_id = ?', [
            create.insertId
        ]);
        console.log(daily);
        res.render('tableFood', {
            dialy: daily[0]
        });

    } else {
        const [Dialy, field] = await conn.query('select * from DAILY where user_id = ?, daily_date = ?',[
            id, time
        ]);
        const [dailys, filed2] = await conn.query('select * from MEAL left outer join MEAL_FOOD using(meal_id) where daily_id = ?', [
            Dialy[0].daily_id
        ]);
        console.log(dailys);
        res.render('tableFood', {
            dialy: dailys[0]
        });
    }

});

router.get('/table/food/history'), async (req, res, next) => {

    const [row, field] = await conn.query('select * from DAILY where user_id = ?');
    const [row2, filed2] = await conn.query('select * from MEAL_FOOD where user_id = ?')
    const [row3, filed3] = await conn.query('select * from food');

    res.render('')
}

exports.router = router;
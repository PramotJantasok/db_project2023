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
    return { date: (yyyy + '-' + mm + '-' + dd), day: dd, month: mm, year: yyyy };
}

router.get('/table/food', async (req, res, next) => {
    const time = dataTime();
    const id = req.get("Cookie").split('token=')[1].trim();
    console.log(id);
    try {
        const [row, field] = await conn.query('select * from DAILY where user_id = ? and daily_date = ?', [
            id, time.date
        ])
        console.log("ROW:", row);

        if (row.length == 0) {
            const create = await conn.query('insert into DAILY(daily_date, user_id) values(?,?)', [
                time.date, id
            ])
            const [newDialy, field] = await conn.query('select * from DAILY where user_id = ? and daily_date like ?', [
                id, time.date
            ]);

            const [daily, filed2] = await conn.query('select * from MEAL left outer join MEAL_FOOD using(meal_id) where daily_id = ?', [
                newDialy.daily_id
            ]);
            console.log(daily);
            res.render('tableFood', {
                dialy: daily[0]
            });

        } else {
            const [Dialy, field] = await conn.query('select * from DAILY where user_id = ? and daily_date like ?', [
                id, time.date
            ]);
            console.log('have dialy:', Dialy)

            const [dailys, filed2] = await conn.query('select * from MEAL left outer join MEAL_FOOD using(meal_id) left outer join FOOD using(food_id) where daily_id = ? and food_id is not null', [
                Dialy[0].daily_id
            ]);
            console.log(dailys);
            res.render('tableFood', {
                dialy: dailys
            });
        }
    } catch (er) {
        console.log(er);
        res.status(404)
    }
});

// res.status(404);



router.delete('/delete/daily/food', async (req, res, next) => {
    const data = req.body;
    console.log("Delete info", data)
    try {
        const del = await conn.query("delete from MEAL_FOOD where meal_id = ? and food_id = ?", [
            Number(data.meal_id), Number(data.food_id)
        ]);
        console.log("Delete ! sus");
        res.redirect('/table/food');
    } catch (er) {
        console.log(er);
        res.redirect('/table/food');
    }
});

router.get('/table/history/food', async (req, res, next) => {
    const id = req.get('Cookie').split('token=')[1].trim();
    try {
        const [dailys, field] = await conn.query('select * from DAILY where user_id = ? and daily_date < ? order by daily_id desc', [Number(id), dataTime().date]);

        const [meals, filed2] = await
            conn.query('select * from MEAL left outer join MEAL_FOOD using(meal_id) left outer join DAILY using(daily_id) left outer join FOOD using(food_id) where user_id = ? and food_id is not null', [Number(id)])

        console.log("Daily:", dailys);
        console.log("Meals: ", meals);
        res.render('historyFood', {
            daily: dailys,
            meal: meals
        })
    } catch (er) {
        console.log(er)
    }
})

router.get('/food', async (req, res, next) => {
    try {
        const [food, field] = await conn.query('select * from FOOD')
        res.render('food', { foods: food });
    } catch (er) {
        console.log(er);
    }

});

router.get('/add/food/:fid', async (req, res) => {
    try {
        const fid = req.params.fid;
        const [row, field] = await conn.query('select * from FOOD where food_id = ?', [fid]);

        res.render('addfood', {
            food: row[0]
        })
    } catch (er) {
        console.log(er);
    }
});

router.post('/add/food', async (req, res) => {
    const time = dataTime();
    try {
        const id = req.get("Cookie").split('token=')[1].trim();
        const fid = req.body.fid;
        const meal_name = req.body.meal_name
        const [row, field] = await conn.query('select * from DAILY where user_id = ? and daily_date = ?', [
            id, time.date
        ])

        if (row.length == 0) {
            const create = await conn.query('insert into DAILY(daily_date, user_id) values(?,?)', [
                time.date, id
            ])
            const [newDialy, field] = await conn.query('select * from DAILY where user_id = ? and daily_date like ?', [
                id, time.date
            ]);
            const [check_meal, cols] = await conn.query('select * from MEAL where daily_id = ? and meal_name =?', [
                newDialy[0].daily_id, meal_name
            ])

            if (check_meal.length == 0) {
                const insert = await conn.query('insert into MEAL(meal_name, daily_id) values(?,?)', [
                    meal_name, newDialy[0].daily_id
                ])
                const [check_meal2, col8] = await conn.query('select * from MEAL where daily_id = ? and meal_name =?', [
                    newDialy[0].daily_id, meal_name
                ])
                const insert_mel = await conn.query('insert into MEAL_FOOD(meal_id, food_id, amount) values(?,?,?)', [
                    check_meal2[0].meal_id, fid, 1
                ])
                console.log(insert_mel);
            } else {
                const insert_mel = await conn.query('insert into MEAL_FOOD(meal_id, food_id, amount) values(?,?,?)', [
                    check_meal[0].meal_id, fid, 1
                ])
                console.log(insert_mel);
            }
        } else {
            const [newDialy7, field] = await conn.query('select * from DAILY where user_id = ? and daily_date like ?', [
                id, time.date
            ]);

            const [check_meal, field3] = await conn.query('select * from MEAL where daily_id = ? and meal_name =?', [
                newDialy7[0].daily_id, meal_name
            ])
            console.log(newDialy7[0]);
            console.log(check_meal[0]);

            if (check_meal.length == 0) {
                const insert = await conn.query('insert into MEAL(meal_name, daily_id) values(?,?)', [
                    meal_name, newDialy7[0].daily_id
                ])
                const [check_meal2, col] = await conn.query('select * from MEAL where daily_id = ? and meal_name =?', [
                    newDialy7[0].daily_id, meal_name
                ])

                const insert_mel = await conn.query('insert into MEAL_FOOD(meal_id, food_id, amount) values(?,?,?)', [
                    check_meal2[0].meal_id, fid, 1
                ])
                console.log(insert_mel);
            } else {

                const insert_mel = await conn.query('insert into MEAL_FOOD(meal_id, food_id, amount) values(?,?,?)', [
                    check_meal[0].meal_id, fid, 1
                ])
                console.log(insert_mel);
            }
        }

    } catch (er) {
        console.log(er);
    }
})

exports.router = router;
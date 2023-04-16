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
    return {date:(yyyy + '-' + mm + '-' + dd), day:dd,month:mm,year:yyyy};
}

router.get('/table/food', async (req, res, next) => {
    const time = dataTime();
    const id = req.get("Cookie").split('token=')[1].trim();
    console.log(id);
    try {
        const [row, field] = await conn.query('select * from DAILY where user_id = ? and daily_date = ?', [
            id, time.date
        ])
        console.log("ROW:",row);
        
        if (row.length == 0) {
            const create = await conn.query('insert into DAILY(daily_date, user_id) values(?,?)', [
                time.date, id
            ])
            const [newDialy, field] = await conn.query('select * from DAILY where user_id = ? and daily_date like ?',[
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



router.delete('/delete/daily/food',async (req, res, next)=>{
    const data = req.body;
    console.log("Delete info",data)
    try{
        const del = await conn.query("delete from MEAL_FOOD where meal_id = ? and food_id = ?",[
            Number(data.meal_id), Number(data.food_id)
        ]);
        console.log("Delete ! sus");
        res.redirect('/table/food');
    }catch(er){
        console.log(er);
        res.redirect('/table/food');
    }
});

router.get('/table/history/food', async (req, res, next) =>{
    const id = req.get('Cookie').split('token=')[1].trim();
    try{
        const [dailys, field] = await conn.query('select * from DAILY where user_id = ? and daily_date < ? order by daily_id desc',[Number(id), dataTime().date]);

        const [meals, filed2] = await 
        conn.query('select * from MEAL left outer join MEAL_FOOD using(meal_id) left outer join DAILY using(daily_id) left outer join FOOD using(food_id) where user_id = ? and food_id is not null',[Number(id)])

        console.log("Daily:", dailys);
        console.log("Meals: ", meals);
        res.render('historyFood',{
            daily: dailys,
            meal: meals
        })
    }catch(er){
        console.log(er)
    }
})

router.get('/food', async (req, res, next) => {
    try{
        const [food, field] = await conn.query('select * from FOOD')
        res.render('food', {foods:food});
    }catch(er){
        console.log(er);
    }
    
});

exports.router = router;
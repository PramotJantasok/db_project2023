const express = require("express");
const conn = require('../configs/config_aws');
const { router } = require("./food");

router = express.Router();

router.get('/exercise', async (req,res)=>{
    try{
        const [row, field] = await conn.query('select * from EXERCISE_CATEGORY');
        res.render('exercise', {
            ex: row
        })
    }catch(er){
        console.log(er);
    }
})

router.get('/table/ex', async (req, res)=>{
    const id = req.get("Cookie").split('token=')[1].trim();
    try{
        const [row, col] = await conn.query('select * from DAILY left outer join EXERCISE_STATISTIC using(daily_id) left outer join EXERCISE_CATEGORY using(ex_id) where ex_id is not null and user_id = ?',[
            id
        ])
        console.log(row);
        res.render('tableExercise', {ex:row})
    }catch(er){
        console.log(er);
    }
})

router.post('/add/ex', async (req, res)=>{
    try{
        
    }catch(er){
        console.log(er);
    }
})

exports.router = router;
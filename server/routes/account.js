const express = require("express");
const conn = require('../configs/config_aws');

router = express.Router();


router.post('/register',async (req,res,next) => {
    try{
        const {user_name,user_pass,user_fname,user_lname,user_gender,user_plan,user_age,user_weight,user_height} = req.body;

        console.log(req.body);
        const [row,fields] = await conn.query(
            "INSERT INTO USER (user_name,user_password,user_fname,user_lname) values (?,?,?,?)",
            [user_name,user_pass,user_fname,user_lname]
        )
        const [row2,fields2] = await conn.query(
            "INSERT INTO PLAN (plan_name) values (?)",
            [user_plan]
        )
        const [row3,fields3] = await conn.query(
            "INSERT INTO PROFILE (user_id,profile_age,profile_height,profile_weight,profile_gender) values (?,?,?,?,?)",
            [row.insertId,user_age,user_height,user_weight,user_gender]
        )
        res.render("login")
    }catch(er){
        console.log(er);
    }
});

router.post('/login' ,async (req,res,next) => {
    try{
        const {login_name,login_password} = req.body;
        // console.log(req.body);
        const [row,fields] = await conn.query(
            "SELECT user_name,user_password,user_id FROM `USER` WHERE user_name = ? and user_password = ?",
            [login_name,login_password]
        )
        console.log(row);

        if (row.length == 1){
            res.setHeader('Set-Cookie', 'token='+row[0].user_id)
            res.redirect("/")
            console.log("success");
        }
        else{
            res.render("login")
            console.log("not found");
        }
    }catch(er){
        console.log(er);
    }
})

router.get('/', async (req,res,next) =>{
    try{
        const id = req.get('Cookie').split('token=')[1].trim()
        console.log(id);
        const [row,fields] = await conn.query(
            "SELECT * FROM `PROFILE` join `USER` as u using (user_id) left outer join PLAN using(plan_id) where u.user_id = ?;",
            [Number(id)]
        )
        console.log(row[0]);
        res.render('home',{user:row[0]})
        // console.log();
        // res.send({user:row})
    }catch(er){
        console.log(er);
    }
})

router.put('/profile', async (req,res,next) => {
    try{
        const id = req.get('Cookie').split('token=')[1].trim()
        console.log(id);
        console.log(req.body);
        console.log("sd");
        const [row,fields] = await conn.query(
            "UPDATE `USER` SET user_fname = ?,user_lname = ? where user_id = ?",
            [req.body.fname,req.body.lname,id]
        )
        const [row2,fields2] = await conn.query(
            "UPDATE `PROFILE` SET profile_age = ?, profile_height = ?,profile_weight = ? ,profile_gender = ? where user_id = ?",
            [req.body.age,req.body.height,req.body.weight,req.body.gerder,id]
        )

    }catch(er){
        console.log(er);
    }
})

exports.router = router;

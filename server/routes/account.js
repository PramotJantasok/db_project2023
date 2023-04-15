const express = require("express");
const conn = require('../configs/config_aws');

router = express.Router();


router.post('/register',async (req,res,next) => {
    try{
        const {user_name,user_pass,user_fname,user_lname,user_gender,user_plan,user_age,user_weight,user_height} = req.body;

        
        console.log(req.body);
        const [row,fields] = await conn.query(
            "INSERT INTO `USER` (user_name,user_password,user_fname,user_lname) values (?,?,?,?)",
            [user_name,user_pass,user_fname,user_lname]
        )
        const [row2,fields2] = await conn.query(
            "INSERT INTO `PLAN` (plan_name) values (?)",
            [user_plan]
        )
        const [row3,fields3] = await conn.query(
            "INSERT INTO `PROFILE` (user_id,profile_age,profile_height,profile_weight,profile_gender) values (?,?,?,?,?)",
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
        console.log(req.body);
        const [row,fields] = await conn.query(
            "SELECT user_name,user_password FROM `USER` WHERE user_name = ? and user_password = ?",
            [login_name,login_password]
        )
        if (row.length == 2){
            res.render("home")
        }
        else{
            res.render("login")
            console.log("not found");
        }
    }catch(er){
        console.log(er);
    }
})
exports.router = router;

const express = require("express");
const conn = require('../configs/config_aws');

router = express.Router();


router.post('/register',async (req,res,next) => {
    try{
        const {user_name,user_pass,user_fname,user_lname} = req.body;

        
        console.log(req.body);
        // const [row,fields] = await conn.query(
        //     "INSERT INTO `USER` (user_name,user_password,user_fname,user_lname) values (?,?,?,?)",
        //     [user_name,user_pass,user_fname,user_lname]
        // )
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
            "SELECT user_name,user_password FROM `USER` WHERE user_name = ? and user_password = ?",
            [login_name,login_password]
        )
        console.log(row);
        if (row.length == 1){
            res.render("home")
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

exports.router = router;


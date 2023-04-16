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
})

exports.router = router;

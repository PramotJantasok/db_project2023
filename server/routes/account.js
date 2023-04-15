const express = require("express");
const conn = require('../configs/config_aws');

router = express.Router();


router.post('/register',async (req,res,next) => {
    try{
        const {user_name,user_pass,user_fname,user_lname} = req.body;
<<<<<<< HEAD
        console.log("BODY",req.body);
        // const[row,flied] = await conn.query(
        //     "INSERT INTO `user` (user_name,user_password,user_fname,user_lname) values (?,?,?,?)",
=======
        
        console.log(req.body);
        // const [row,fields] = await conn.query(
        //     "INSERT INTO `USER` (user_name,user_password,user_fname,user_lname) values (?,?,?,?)",
>>>>>>> bc3b43fafe16b0f97cfff98bb28b7303e74f5921
        //     [user_name,user_pass,user_fname,user_lname]
        // )
        res.render("login")
    }catch(er){
        console.log(er);
    }
})

<<<<<<< HEAD
exports.router = router;
=======
exports.router = router;
>>>>>>> bc3b43fafe16b0f97cfff98bb28b7303e74f5921

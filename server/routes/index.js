const express = require("express");
const conn = require('../configs/config_aws');
router = express.Router();



router.get('/table/food', (req, res, next) =>{
    res.render('tableFood.ejs');
});

router.get('/register',(req,res,next) => {
    res.render('register');
});

router.get('/login',(req,res,next) =>{
    res.render("login");
})

router.get('/food', (req,res,next) => {
    res.render('food');
})
 router.get('/addfood' , (req,res,next) => {
    res.render('addfood');
 })

 router.get('/profile' ,async (req,res,next) => {
    const id = req.get('Cookie').split('token=')[1].trim()
    console.log(id);
    const [row,field] = await conn.query(
        "SELECT user_fname,user_lname FROM `USER` WHERE user_id = ?",
        [id]
    )
    console.log(row[0]);
    const [row2,fields2] = await conn.query(
        "SELECT plan_id,profile_age,profile_height,profile_weight,profile_gender FROM `PROFILE` WHERE user_id = ?",
        [id]
    )
    console.log(row2[0]);
    res.render('profile', {user1:row[0],user2:row2[0]});
 })

router.get('/tableFood', (req,res,next) => {
    res.render('tableFood');
})
exports.router = router;
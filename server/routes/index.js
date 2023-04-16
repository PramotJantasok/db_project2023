const express = require("express");
const conn = require('../configs/config_aws');

router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('home')
});

router.get('/table/food', (req, res, next) =>{
    res.render('tableFood.ejs');
});

router.get('/register',(req,res,next) => {
    res.render('register');
});

router.get('/login',(req,res,next) =>{
    res.render("login");
});

router.get('/food', (req,res,next) => {
    res.render('food');
});

 router.get('/addfood' , (req,res,next) => {
    res.render('addfood');
 });

 router.get('/profile' , (req,res,next) => {
    res.render('profile')
 });

router.get('/tableFood', async (req,res,next) => {
    try{
        const [row, field] = await conn.query('select * ')
    }catch(er){
        console.log(er);
        res.status(404);
    }
    res.render('tableFood');
});


exports.router = router;
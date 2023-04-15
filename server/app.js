const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'static')))

app.use(express.json());



app.listen(3000, ()=>{
    console.log(`Example app listening at http://localhost:3000`);
})
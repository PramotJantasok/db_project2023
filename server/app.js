const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// app.use(express.static(path.join(__dirname, 'statics')))
app.use(express.static('statics'));
app.use(express.json());
const indexRoute = require('./routes/index');
app.use(indexRoute.router);

const foodRoute = require('./routes/food');
app.use(foodRoute.router);

app.listen(3000, () => {
    console.log(`server listening at http://localhost:3000`);
})
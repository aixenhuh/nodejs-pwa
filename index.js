var express = require('express');
var $ = require('jquery');
var dotenv = require('dotenv');

dotenv.config({ path: './.env'});

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('html', require('jade').renderFile);
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, () => {
    console.log('접속 완료');
})
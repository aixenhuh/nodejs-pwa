var express = require('express');

var app = express();

app.get('/', (req, res) => {
    console.log(req.get('navigator'));
    //res.render('./view/index');
})

app.listen(3000, () => {
    console.log('접속 완료');
})


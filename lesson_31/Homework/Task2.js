var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.port || 1337;


// соединения могут быть объединены для облегчения их многократного использования
// или использования больщого количесва соединений
var pool = mysql.createPool({
    connectionLimit: 10, // максимальное количество соединений, которые могут быть созданы одновременно
    queueLimit: 10, // максимальное разрешенное количество соединений в очереди обработки
    aquireTimeout: 5000, // максимальное время ожидания при установке соединения
    host: 'localhost',
    user: 'root',
    password: '1606',
    database: 'test'
});

app.get('/addItem', function (req, res) {
    res.sendFile(path.join(__dirname, '/view/add.html'))
});
var jsonParser = bodyParser.json();
var textParser = bodyParser.text();

app.use(jsonParser);
app.use(textParser);
app.use(bodyParser.urlencoded({extended: true}));

app.post('/addNewItem', function (req, res) {
    console.log('/addNewItem')
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err.stack);
            return;
        }

        console.log(req.body.id)
        console.log(req.body.name)
        console.log(req.body.info)


        var id = req.body.id;
        var name = req.body.name;
        var info = req.body.info;
        conn.query(`INSERT INTO test_table (id, name, info) VALUES (${id}, ${name}, ${info})`)
        res.send();
        conn.release(function () {
            console.log('connection closed')
        })

    })
})

app.get('/', function (req, res) {
    // создать соединение
    pool.getConnection(function (err, conn) {

        if (err) {
            console.log(err.stack);
            return;
        }

        // использовать соединение
        conn.query('SELECT * FROM `test_table`', function (err, rows, fields) {
            res.write('<table>');

            for (var i = 0; i < rows.length; i++) {
                res.write(`
				<tr>
					<td>${rows[i].id}</td>
					<td>${rows[i].name}</td>
					<td>${rows[i].info}</td>
				</tr>
			`)
            }
            ;

            res.write('</table>');
            res.end();



        })


    });


});

// событие connection генерируется при установлении подключения
pool.on('connection', function () {
    console.log('connected');
});


app.listen(port, function () {

    console.log('app listening on port ' + port);

});


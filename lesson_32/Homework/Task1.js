var express  = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path')
var port = process.env.port || 1337;
var bodyParser = require('body-parser');
var http = require('http');

var jsonParser = bodyParser.json();
var textParser = bodyParser.text();

app.use(jsonParser);
app.use(textParser);

// установка генератора шаблонов
app.set('views', './views');
app.set('view engine', 'ejs');

// middleware для обработки тела запроса в кодировке urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// соединения могут быть объединены для облегчения их многократного использования
// или использования больщого количесва соединений
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1606',
    database: 'demo'
});

app.get('/', function(req, res) {

    // создать соединение
    pool.getConnection(function(err, conn) {


        conn.query('SELECT * FROM `items`', function(err, rows) {
            if (err) console.log(err);

            // генерация рядов таблицы на основе полученных данных
            var table_rows = rows.map((row) => {
                return (` <tr>
	                            <td>${row.ID} </td>
	                            <td>${row.NAME}</td>
	                            <td>${row.DESCRIPTION}</td>
	                        </tr> `)
            })

            table_rows.join(' ');

            res.render('index', { data:  table_rows});
            conn.release();

        });
    });
});

app.delete('/:id', function(req, res) {
    console.log('deleting items');

    // подключение к бд
    pool.getConnection(function (err, conn) {
        // запрос к бд
        var sql = 'DELETE FROM `items` WHERE id=?';

        sql = mysql.format(sql, req.params.id);

        conn.query(sql, function(err) {

            if (err) {
                console.log(err);
                return;
            };

            console.log('data deleted!');
        });

        // завершение соединения
        conn.release();
        res.end();
    })

});

app.get('/addItem', function(req, res) {
    console.log('adding items');
    //res.redirect('/');
    res.sendFile(path.join(__dirname,'/views/addItem.html'));
});

app.get('/editItem/:id', function(req, res) {
    console.log('editing items');
    // подключение к бд
    pool.getConnection(function (err, connection) {
        // запрос к бд
        var sql ='SELECT * FROM `items` WHERE id=?';
        // альтернатива функции escape-использование '?' как placeholder и передача данных, которые должны быть
        // использованы в запросе, в массиве в качестве аргумента функции query, следующего за строкой sql запроса

        connection.query(sql, [req.params.id], function(err, rows) {

            if (err) {
                console.log(err);
                return;
            };

            res.render('editItem', {
                id: rows[0].ID,
                name: rows[0].NAME,
                info: rows[0].DESCRIPTION
            });
            //console.log(rows[0].id);

            connection.release();
        });


    })
});

app.put('/editItem', function(req, res) {
    console.log('updating item');
    var data = req.body;
    pool.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        // форматирование запроса
        var sql = 'UPDATE `items` SET NAME=?, DESCRIPTION=? WHERE ID=?';
        var inserts = [data.name, data.info, data.id];
        sql = mysql.format(sql, inserts);

        conn.query(sql, function(err) {

            if (err) {
                console.log(err);
                return;
            };

            console.log('data inserted!');
        });

        // закончить соединение, позволить ему быть использованным еще раз
        conn.release();
    });
});

// обработка POST запросов по пути '/addItem'
app.post('/addItem', function(req, res) {
    // чтение данных POST запроса
    var data = req.body.text.split(';');
    var data1 = data[0];
    var data2 = data[1];

    var newItem = {
        name: data1,
        info: data2
    };

    pool.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        var sql = 'INSERT INTO `items` (NAME, DESCRIPTION) VALUES ( ?, ?)';
        // альтернатива функции escape-использование '?' как placeholder и передача данных, которые должны быть
        // использованы в запросе, в массиве в качестве аргумента функции query, следующего за строкой sql запроса

        conn.query(sql, [newItem.name, newItem.info], function(err) {

            if (err) {
                console.log(err);
                return;
            };

            console.log('data inserted!');
        });

        // закончить соединение, позволить ему быть использованным еще раз
        conn.release();
    });
});

// событие connection генерируется при установлении подключения
pool.on('connection', function() {
    console.log('connected');
});

// событие enqueue генерируется, когда в очереди обработки есть соединения, ожидающие подключения
pool.on('enqueue', function() {
    console.log('waiting for connection');
});

app.listen(port, function() {
    console.log('app listening on port ' + port);
});

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

const monthRanges = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

app.use(express.json());
app.use(cors({
    origin: '*'
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Boobies__1234!',
    database: 'BUGETING'
});
connection.connect();

//Get all static expenses for nick
app.get('/nick', (req, res) => {
    connection.query("SELECT * FROM NICK_EXPENSES", function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    });
});

//Get all static expenses for Lilian
app.get('/lilian', (req, res) => {
    connection.query("SELECT * FROM LILIAN_EXPENSES", function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    });
});


//Get all variable expenses for Nick
app.get('/nick/:year-:month', (req, res) => {
    var start = `${req.params.year}-${req.params.month}-01 00:00:00`;
    var end = `${req.params.year}-${req.params.month}-${monthRanges[req.params.month - 1]} 23:59:59`;
    var query = `SELECT * FROM NICK_EXPENSES_VARIABLE WHERE TransactionDate BETWEEN '${start}' AND '${end}'`

    connection.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            res.send(JSON.stringify(result));
        }
    });
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}..`));
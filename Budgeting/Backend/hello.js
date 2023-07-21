const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

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

//READ Request Handlers
app.get('/', (req, res) => {
    connection.query("SELECT * FROM NICK_EXPENSES", function (err, result, fields) {
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

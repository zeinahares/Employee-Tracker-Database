const express = require('express');
const mysql = require('mysql2');
const api = require('./routes/api/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'boot2023',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

app.use(express.static('public'));


app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.js'))
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
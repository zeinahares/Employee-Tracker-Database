const express = require('express');

const api = require('./routes/api/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);



app.use(express.static('public'));


app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.js'))
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
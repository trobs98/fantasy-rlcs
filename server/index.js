const express = require('express');
const axios = require('axios').default;

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/players', (req, res) => {
    axios.get('https://zsr.octane.gg/players', {})
        .then((data) => {
            console.log('Players Data: ', data.data);
            res.send(data.data)
        });

    
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
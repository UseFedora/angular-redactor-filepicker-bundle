// for dev only

const express = require('express');
const app = express();

app.use(express.static('./'));

console.log('https://localhost:8000');
app.listen(8000);

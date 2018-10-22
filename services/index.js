const express = require('express');
const app = express();
const routers = require('../routers/routers.js');
app.use(express.json());

app.use('/users',routers);

app.listen(8001);
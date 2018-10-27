const express = require('express');
const app = express();
const routers = require('./routers/routers.js');
app.use(express.json());

app.use('/users',routers);

app.use((req,res,next)=>{
    const error = new Error("Wrong URL");
    error.status = 404;
    next(error);
});
app.use((error,req,res)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            status:error.status,
            message:error.message
        }
    });
});


app.listen(8001);
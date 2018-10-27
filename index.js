const express = require('express');
const app = express();
const routes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
app.use(express.json());

app.use('/system/users',routes);
app.use('/admin',adminRoutes);

app.use('/',(req,res,next)=>{
    const error = new Error("Wrong URL");
    error.status = 404;
    next(error);
});
app.use('/',(error,req,res)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            status:error.status,
            message:error.message
        }
    });
});


app.listen(8001);
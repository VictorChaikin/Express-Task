const express = require('express');
const adminRoutes = express.Router();
const usersArray = require('../Users.json');
const jwt = require('../jwt.service.js');
const users=[];

for(let i=0;i<usersArray.length;i++){
    users.push(usersArray[i]);
}
adminRoutes.get('/:id',(req,res)=>{
    res.json(req.params.id);
});
adminRoutes.get('/users/:userId/generate-token',(req,res,next)=>{
    let user = users.find((user)=>{return user.id === req.params.userId});
    console.log(user);
    if(user!==undefined){
        res.json({token : jwt.generateToken({userID:user.id,role: "user"})});
        next();
    }else{
        let error = ({name: 'User not found', message: 'user not found with such params', status: 404});
        next(error);
    }
});
adminRoutes.get('/system/generate-token',(req,res,next)=>{
        res.json({ token :jwt.generateToken({role:"system"})});
        next();
});
module.exports = adminRoutes;
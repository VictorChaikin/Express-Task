const express = require('express');
const router = express.Router();
const usersArray = require('../Users.json');
const users=[];

for(let i=0;i<usersArray.length;i++){
    users.push(usersArray[i]);
}
router.use('/',(req,res,next)=>{
    console.log("Time : "+Date.now());
    console.log("Url : "+req.originalUrl);
    console.log("Method : "+req.method);
    next();
});

router.get('/', (req,res,next)=> {
    res.json(users);
    next();
});

router.get('/:id',(req,res,next)=>{
    let elem = users.find((elem)=>{return elem.id === req.params.id});
    if(elem){
        res.json(elem);
        next();
    }
    else{
        let error = ({name: 'User not found', message: 'user not found with such params', status: 404});
        next(error);
    }
});

router.delete('/:id',(req,res,next)=>{
    let user = users.find((current,index)=>{
        if(current.id === req.params.id){
            users.splice(index,1);
            return current;
        }
    });
     if(user){
         res.json("User with such params :"+"id = "+req.params.id+" is deleted");
         next();
     }
     else{
         let error = ({name: 'User not found', message: 'user not found with such params', status: 404});
         next(error);
     }
 });

router.post('/', (req,res,next)=>{
    let user = {
        id:req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber
    };
    users.push(user);
    res.json(user);
    next();
});

router.put('/:id',(req,res,next)=>{
    let user = users.find((current,index)=>{
        if(current.id === req.params.id){
            users.splice(index,1);
            return current;
        }
    });
    if(user){
        let user ={
            "id" : req.body.id,
            "name":req.body.name,
            "surname" : req.body.surname,
            "email" : req.body.email,
            "phoneNumber" : req.body.phoneNumber
        };
        users.push(user);
        res.json(user);
        next();
    }
    else{
        let error = {name: 'User not found', message: 'user not found with such params', status: 404};
        next(error);
    }
});

router.patch('/:id',(req,res,next)=>{
    let user = users.find((user)=>{return user.id === req.params.id});
    if(user){
        user.name = (req.body.name)?req.body.name : user.name;
        user.surname = (req.body.surname)?req.body.surname : user.surname;
        user.email = (req.body.email)?req.body.email : user.email;
        user.phoneNumber = (req.body.phoneNumber)?req.body.phoneNumber : user.phoneNumber;
        res.json(user);
        next();
    }
    else{
        let error = {name: 'User not found', message: 'user not found with such params', status: 404};
        next(error);
    }
});
module.exports = router;
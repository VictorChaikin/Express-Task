const express = require('express');
const router = express.Router();
const usersArray = require('../services/Users.json');
const  createUser = require('../users create/create.js');
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
    let elem;
    for(const i of users){
        if(i.id === req.params.id){
            elem = i;
        }
    }

    if(elem!==undefined){
        res.json(elem);
        next();
    }
    else{
        let error = ({name: 'User not found', message: 'user not found with such params', status: 404});
        next(error);
    }
});

router.delete('/DEL/:id',(req,res,next)=>{
    let counter=0;
    let found = false;
     for(const i of users){
         counter++;
         if(i.id === req.params.id){
             found= true;
             users.splice(counter-1,1);
         }
     }
     if(found === true){
         res.send(users);
         next();
     }
     else{
         let error = ({name: 'User not found', message: 'user not found with such params', status: 404});
         next(error);
     }
 });

router.post('/', (req,res,next)=>{
    let user = createUser(users);
    users.push(user);
    res.send(users);
    next();
});

router.put('/:id',(req,res,next)=>{
    let counter = 0;
    let found = false;
    for(const i of users){
        counter++;
        if(i.id === req.params.id){
            users.splice(counter-1,1);
            found=true;
        }
    }
    if(found===true){
        let user ={
            "id" : req.body.id,
            "name":req.body.name,
            "surname" : req.body.surname,
            "email" : req.body.email,
            "phoneNumber" : req.body.phoneNumber
        };
        users.push(user);
        res.send(users);
        next();
    }
    else{
        let error = {name: 'User not found', message: 'user not found with such params', status: 404};
        next(error);
    }
});

router.patch('/:id',(req,res,next)=>{
    let counter=0;
    let found = false;
    for(const i of users){
        counter++;
        if(i.id === req.params.id){
            found= true;
            i.name = (req.body.name !== undefined)?req.body.name : i.name;
            i.surname = (req.body.surname !== undefined)?req.body.surname : i.surname;
            i.email = (req.body.email !== undefined)?req.body.email : i.email;
            i.phoneNumber = (req.body.phoneNumber !== undefined)?req.body.phoneNumber : i.phoneNumber;

        }
    }
    if(found === true){
        res.send(users);
        next();
    }
    else{
        let error = {name: 'User not found', message: 'user not found with such params', status: 404};
        next(error);
    }
});
module.exports = router;
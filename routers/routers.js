const express = require('express');
const router = express.Router();
const usersArray = require('../services/Users.json');
const  createUser = require('../users create/create.js');
const users=[];

for(let i=0;i<usersArray.length;i++){
    users.push(usersArray[i]);
}

router.get('/',function (req,res) {
    res.json(users);
});

router.get('/:id',(req,res)=>{
    let elem;
    for(const i of users){
        if(i.id === req.params.id){
            elem = i;
        }
    }
    res.json(elem);
});

router.delete('/DEL/:id',(req,res)=>{
     for(const i of users){
         counter++;
         if(i.id === req.params.id){
             users.splice(counter-1,1);
         }
     }
     res.send(users);
 });

router.post('/', (req,res)=>{
    let user = createUser(users);
    users.push(user);
    res.send(users);
});

router.put('/:id',(req,res)=>{
    let counter = 0;
    for(const i of users){
        counter++;
        if(i.id === req.params.id){
            users.splice(counter-1,1);
        }
    }
    let user ={
        "id" : req.body.id,
        "name":req.body.name,
        "surname" : req.body.surname,
        "email" : req.body.email,
        "phoneNumber" : req.body.phoneNumber
    };
    users.push(user);
    res.send(users);
});

router.patch('/:id',(req,res)=>{
    let counter=0;
    for(const i of users){
        counter++;
        if(i.id === req.params.id){
            i.name = (req.body.name !== undefined)?req.body.name : i.name;
            i.surname = (req.body.surname !== undefined)?req.body.surname : i.surname;
            i.email = (req.body.email !== undefined)?req.body.email : i.email;
            i.phoneNumber = (req.body.phoneNumber !== undefined)?req.body.phoneNumber : i.phoneNumber;

        }
    }
    res.send(users);
});
module.exports = router;
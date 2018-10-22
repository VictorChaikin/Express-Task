const surnames = require("./surnames.json");
const names = require('./names.json');
const emails = require('./email domains.json');
const codes = require('./countryCodes.json');

randomPhoneNumber = function() {
    console.log();
    let phoneNumber =codes[Math.floor(Math.random()*codes.length-1)].code;
    for(let i=0;i<9;i++){
        phoneNumber+=Math.floor(Math.random()*10);
    }
    return phoneNumber;
};

createId = function(array) {
    let id;
    if(array[0] === undefined){
        id = 1;
    }
    else{
        id = Number(array[array.length-1].id)+1;
    }
    return id;
};

createUser = function(array=[]) {
    let user = {
        "id" :createId(array).toString(),
        "name" : names[Math.floor(Math.random()*(names.length-1))],
        "surname" : surnames[Math.floor(Math.random()*(surnames.length-1))],
        "phoneNumber" : randomPhoneNumber()
    };
    user.email = user.name.toLowerCase() +"."+user.surname.toLowerCase() +"@"+emails[Math.floor(Math.random()*(emails.length-1))];
    return user;
};

createUsers = function(array = [],amount) {
    for(let i=0;i<amount;i++){
        let user = createUser(array);
        array.push(user);
    }
    return array;
};

module.exports = createUser;
//module.exports = createUsers;
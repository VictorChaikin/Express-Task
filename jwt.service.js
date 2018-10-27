const jwt =require('jsonwebtoken');
const SECRET_KEY = "mySecretKey";

let tokenSettings ={ auth: {tokenExpirationTimeSec: 300, version: 1}};
 jwt.generateToken = function(userData) {
    return jwt.sign({userData:userData,tokenVersion : tokenSettings.auth.version}, SECRET_KEY,  {
        expiresIn: tokenSettings.auth.tokenExpirationTimeSec
        });
};
 jwt.verifyToken = function(token) {
    console.log(token);
    const decodedData = jwt.decode(token);
    console.log(decodedData);
    if(decodedData.tokenVersion === tokenSettings.auth.version){
        return {
            userID:decodedData.userData.id,
            role : "user",
            version : decodedData.tokenVersion,
            time:Date.now()
        }
    }
    else{
        console.log("Wrong version");
    }
};
module.exports = jwt;
const  mysql= require('mysql2');
var mysqlConnection =mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"abdullah@123",
    database:"employess_db"
})

mysqlConnection.connect((err)=>{
    if(err){
    console.log('Error Connection   in Database :'+ JSON.stringify(err,undefined,2));
    }
    else{
        console.log('Database Connected Sucesssfully!!');
    }

})
module.exports = mysqlConnection
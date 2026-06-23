import mysql from 'mysql';

const host = 'localhost';
const user = 'root';
const password = '';

const conn = mysql.createConnection({
    host: host,
    user: user,
    password: password
});

conn.connect((err)=>{
    if(err){console.log(err);} 
    else{console.log("connected to my sql database");}
    
});

export default conn;



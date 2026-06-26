import mysql from 'mysql';

const host = 'localhost';
const user = 'root';
const password = '';

const conn = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: 'pharmacy_db'
});

conn.connect((err)=>{
    if(err){console.error('Connection failed',err);} 
    else{console.log("connected to my sql database");}
    
});

export default conn;



import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vi@050505", // change this
  database: "foodapp"
});

db.connect((err)=>{
  if(err){
    console.log("DB Error",err);
  } else {
    console.log("MySQL Connected");
  }
});

export default db;
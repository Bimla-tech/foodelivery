import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET);
};

// REGISTER
export const registerUser = async (req,res)=>{
  const {name,email,password} = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err,result)=>{
    if(result.length>0){
      return res.json({success:false,message:"User exists"});
    }

    const hashed = await bcrypt.hash(password,10);

    db.query(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name,email,hashed],
      (err,data)=>{
        const token = createToken(data.insertId);
        res.json({success:true,token});
      }
    );
  });
};

// LOGIN
export const loginUser = (req,res)=>{
  const {email,password} = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err,result)=>{
    if(result.length==0){
      return res.json({success:false});
    }

    const user = result[0];
    const match = await bcrypt.compare(password,user.password);

    if(!match){
      return res.json({success:false});
    }

    const token = createToken(user.id);
    res.json({success:true,token});
  });
};
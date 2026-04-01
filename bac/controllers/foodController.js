import db from "../config/db.js";
import fs from "fs";

export const addFood = (req,res)=>{
  const {name,description,price,category} = req.body;
  const image = req.file.filename;

  db.query(
    "INSERT INTO foods (name,description,price,category,image) VALUES (?,?,?,?,?)",
    [name,description,price,category,image],
    ()=>{
      res.json({success:true});
    }
  );
};

export const listFood = (req,res)=>{
  db.query("SELECT * FROM foods",(err,data)=>{
    res.json({success:true,data});
  });
};

export const removeFood = (req,res)=>{
  const id = req.body.id;

  db.query("SELECT * FROM foods WHERE id=?", [id], (err,result)=>{
    fs.unlink(`uploads/${result[0].image}`,()=>{});

    db.query("DELETE FROM foods WHERE id=?", [id], ()=>{
      res.json({success:true});
    });
  });
};
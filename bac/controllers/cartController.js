import db from "../config/db.js";

export const addToCart = (req,res)=>{
  const {userId,itemId} = req.body;

  db.query(
    "SELECT * FROM cart WHERE userId=? AND itemId=?",
    [userId,itemId],
    (err,result)=>{
      if(result.length==0){
        db.query(
          "INSERT INTO cart (userId,itemId,quantity) VALUES (?,?,1)",
          [userId,itemId]
        );
      } else {
        db.query(
          "UPDATE cart SET quantity=quantity+1 WHERE userId=? AND itemId=?",
          [userId,itemId]
        );
      }

      res.json({success:true});
    }
  );
};

export const removeFromCart = (req,res)=>{
  const {userId,itemId} = req.body;

  db.query(
    "UPDATE cart SET quantity=quantity-1 WHERE userId=? AND itemId=?",
    [userId,itemId],
    ()=>{
      res.json({success:true});
    }
  );
};

export const getCart = (req,res)=>{
  const {userId} = req.body;

  db.query(
    "SELECT * FROM cart WHERE userId=?",
    [userId],
    (err,data)=>{
      res.json({success:true,data});
    }
  );
};
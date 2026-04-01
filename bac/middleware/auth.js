import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
  const token = req.headers.token;

  if(!token) return res.json({success:false});

  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  req.body.userId = decoded.id;

  next();
};

export default authMiddleware;
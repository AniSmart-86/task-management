import jwt from 'jsonwebtoken'

const authUser = async(req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
}

export default authUser

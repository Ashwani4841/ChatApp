// import jwt from 'jsonwebtoken'
// import User from '../Models/userModels.js'

// const isLogin = (req, res, next) => {
//     try {
//         const token = req.cookies.jwt
//         if (!token) return res.status(500).send({ success: false, message: "User Unauthorize" });
//         const decode = jwt.verify(token,process.env.JWT_SECRET);
//         if(!decode)  return res.status(500).send({success:false, message:"User Unauthorize -Invalid Token"})
//         const user = User.findById(decode.userId).select("-password");
//         if(!user) return res.status(500).send({success:false, message:"User not found"})
//         req.user = user,
//         next()
//     } catch (error) {
//         console.log(`error in isLogin middleware ${error.message}`);
//         res.status(500).send({
//             success: false,
//             message: error
//         })
//     }
// }

// export default isLogin



import jwt from 'jsonwebtoken';
import User from '../Models/userModels.js';

const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized: No token" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).send({ success: false, message: "Unauthorized: Invalid token" });
    }

    //FIX: use await
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    req.user = user; //  Proper user object
    next();
  } catch (error) {
    console.log(`Error in isLogin middleware: ${error.message}`);
    res.status(500).send({
      success: false,
      message: "Authentication error",
    });
  }
};

export default isLogin;

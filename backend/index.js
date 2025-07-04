// import express from "express"
// import dotenv from "dotenv";
// import authRouter from  './rout/authUser.js'
// import messageRouter from './rout/messageRout.js'
// import userRouter from './rout/userRout.js'
// import cookieParser from "cookie-parser";
// import path from "path";
// import {app , server} from './Socket/socket.js'

// dotenv.config();
// import dbConnect from "./DB/dbConnect.js";

// const __dirname = path.resolve();





// app.use(express.json());
// app.use(cookieParser());

// app.use('/api/auth',authRouter)
// app.use('/api/message',messageRouter)
// app.use('/api/user',userRouter)

// app.use(express.static(path.join(__dirname,"/frontend/dist")))

// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
// })

// const PORT = process.env.PORT || 3000

// server.listen(PORT,()=>{
//     console.log("MongoDB URI:", process.env.MONGODB_CONNECT);

//     dbConnect()
//     console.log(`Working at ${PORT}`);
// })

import express from "express";
import dotenv from "dotenv";
import authRouter from './rout/authUser.js';
import messageRouter from './rout/messageRout.js';
import userRouter from './rout/userRout.js';
import cookieParser from "cookie-parser";
import path from "path";
import http from 'http';
import { createSocketServer } from './Socket/socket.js';
import dbConnect from "./DB/dbConnect.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
createSocketServer(server); // ✅ Setup sockets

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  dbConnect();
  console.log(`Server running on port ${PORT}`);
});

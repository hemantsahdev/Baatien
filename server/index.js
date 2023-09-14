const express= require("express");
const cors= require("cors");
const mongoose= require("mongoose");
const userRoutes=require("./routes/userRoutes");
const messagesRoutes=require('./routes/messagesRoutes');
const socket=require('socket.io')

const app= express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
// const port=process.env.PORT || 5000;

app.use("/api/auth",userRoutes);
app.use("/api/messages",messagesRoutes);

mongoose.connect("mongodb://0.0.0.0:27017/chats",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log("connection successful"))
.catch((e)=>{ console.log("No connection")});

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Port ${process.env.PORT}`)
})
const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        Credentials:true,
    },
});

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatsocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    });
})


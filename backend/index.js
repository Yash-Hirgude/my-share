const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require("cors");
const socketIo = require("socket.io");
const StringArrayMap = require("./utils/StringArrayMap");


app.use(cors());
const io = socketIo(server,{
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
});
const users = new StringArrayMap();

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Assign a user ID when they join
    socket.on("register", (user) => {
        console.log('user registration...');
        user.id = socket.id;
        users.addElement(user.address,user); // Map user ID to socket ID
        console.log(`User ${user.name} connected with Socket ID: ${user.id}`);
    });

    socket.on('receiverSelected',(data)=>{
        console.log(`selected device: ${data}`);
    });

    // Send message to a specific user
    socket.on("sendMessage", ({ receiverId, message }) => {
        const receiverSocketId = users[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", { message });
            console.log(`Message sent to ${receiverId}: ${message}`);
        } else {
            console.log(`User ${receiverId} is not online.`);
        }
    });

    

    // Remove user when they disconnect
    socket.on("disconnect", (address) => {
        users.removeElement(address,socket.id);
        console.log(`User ${socket.id} disconnected`);
        // for (let userId in users) {
        //     if (users[userId] === socket.id) {
        //         delete users[userId];
        //         console.log(`User ${userId} disconnected`);
        //         break;
        //     }
        // }
    });
});

app.get('/getUsers',(req,res)=>{
    let address = req.query.address;
    console.log(address);
    // console.log(users.getUsers(address));
    users.printMap();
    res.json(users.getUsers(address));
    res.end();
})

server.listen(4000, () => {
    console.log('listening on *:4000');
});



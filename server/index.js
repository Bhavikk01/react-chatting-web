const express = require("express");
const cors = require("cors");
const MongoDBService = require("./mongoDB/mongodb_service");
const authRouter = require("./routers/auth_routes");
const messageRouter = require("./routers/messages_routes");
const socket = require('socket.io');

const app = express();
require("dotenv").config();

const db = new MongoDBService();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

const server = app.listen(process.env.PORT, () => {
    console.log("Server is started");
    db.connectDB();
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        Credentials: true,
    },
});

global.onlineUser = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUser.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUser.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});
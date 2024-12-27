const express = require("express");
const app = express();
const http = require('http');
const vm = require('vm');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const router = require("./routes/auth.route.js")
const connectDB = require('./db/connectDB.js');
dotenv.config();
app.use(cookieParser());

const FRONTEND_URL = process.env.FRONTEND_URL;

const { Server } = require('socket.io');
const ACTIONS = require('./Actions.js');

// cors
// app.use(cors({
//     origin: FRONTEND_URL,
//     credentials: true,
// }));


const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    // cors: {
    //     origin: FRONTEND_URL, // Replace with your frontend URL
    //     methods: ["GET", "POST"],
    // },
});



app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;





app.post('/run-code', (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).send({ error: 'No code provided' });
    }
    try {
        // Create a sandbox and override console.log
        const sandbox = {
            console: {
                log: (...args) => {
                    sandbox.logs.push(args.join(' ')); // Capture logs
                },
            },
            logs: [],
        };
        vm.createContext(sandbox); // Contextualize the sandbox

        // Execute the code in the sandbox
        vm.runInContext(code, sandbox);

        // Return captured logs as result
        res.send({ result: sandbox.logs.join('\n') });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {
    //map type 
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            userName: userSocketMap[socketId]
        }
    });
}


io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
    socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
        if (userSocketMap[socket.id]) {
            // Disconnect previous connection
            userSocketMap[socket.id].disconnect();
        }
        userSocketMap[socket.id] = userName;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                userName,
                socketId: socket.id,
            });
        })
        console.log(clients);
    })


    // handle code change

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {

        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code })
    })

    //sync code 
    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {

        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code })
    })


    // Handle disconnection
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                userName: userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id];
        socket.leave();
    });

});

app.use(express.json()) // allows us to inconing reque fiorm json
app.use(cookieParser());

app.use("/api", router);

app.get('/', (req, res) => {

    res.send("Helld world");
})

server.listen(PORT, () => {
    connectDB();
    console.log("server is running in the port", PORT);
})
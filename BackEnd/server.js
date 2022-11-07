require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParse = require("body-parser");
const usersRoute = require("./routers/users3");
const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});

//CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"), res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
		return res.status(200).json({});
	}
	next();
});

//Middlewares
app.use(cors());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(morgan("dev"));

// Routes
//app.use("/users", usersRoute);
const usersRouter = require("./routers/users");
const postsRouter = require("./routers/posts");
const subredditsRouter = require("./routers/subreddits");
const moderatorsRouter = require("./routers/moderators");
const commentsRouter = require("./routers/comments");
const votesRouter = require("./routers/votes");

// Default
app.get("/", (req, res) => {
	res.status(200).send({ msg: "Hello" });
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/subreddits", subredditsRouter);
app.use("/moderators", moderatorsRouter);
app.use("/comments", commentsRouter);
app.use("/votes", votesRouter);

app.post("/invite_friends", (req, res) => {
	const { email } = req.body;
	const API_KEY = process.env.API_KEY;

	const sg = require("@sendgrid/mail");
	sg.setApiKey(API_KEY);

	const message = {
		to: email, //insert email from form over here
		from: "parthshahk@gmail.com",
		subject: "Invitation to join Digital Moment",
		text: "Hello, you are invited to join the Digital Moment to connect: \n" + "https://gregarious-sunflower-12488a.netlify.app/meeting", //insert
	};

	sg.send(message)
		.then(() => {
			res.status(200).send({ msg: "Sent message" });
		})
		.catch((error) => {
			console.error(error.response.body);
			res.status(404).send({ error: error.response.body });
		});
});

// Room Calling
const users = {};
const socketToRoom = {};

io.on("connection", (socket) => {
	socket.on("join room", ({ roomID, instrument }) => {
		if (users[roomID]) {
			const length = users[roomID].length;
			if (length === 4) {
				socket.emit("room full");
				return;
			}
			users[roomID].push({ callerID: socket.id, instrument });
		} else {
			users[roomID] = [{ callerID: socket.id, instrument }];
		}
		socketToRoom[socket.id] = roomID;
		const usersInThisRoom = users[roomID].filter((user) => user.callerID !== socket.id);
		socket.emit("all users", usersInThisRoom);
	});

	socket.on("sending signal", (payload) => {
		io.to(payload.userToSignal).emit("user joined", {
			signal: payload.signal,
			callerID: payload.callerID,
			instrument: payload.instrument,
		});
	});

	socket.on("returning signal", (payload) => {
		io.to(payload.callerID).emit("receiving returned signal", {
			signal: payload.signal,
			id: socket.id,
		});
	});

	socket.on("disconnect", () => {
		const roomID = socketToRoom[socket.id];
		let room = users[roomID];
		if (room) {
			room = room.filter((user) => user.callerID !== socket.id);
			users[roomID] = room;
		}
		socket.broadcast.emit("user left", socket.id);
	});

	socket.on("change", (payload) => {
		socket.broadcast.emit("change", payload);
	});
});

const colors = ["blue", "green", "orange", "pink", "purple", "red", "teal", "yellow"];

var rooms = [];
const roomIdSize = 4;

// Socket
io.on("connectionn", (socket) => {
	socket.on("playerLoaded", (rid, name) => {
		let room = getRoom(rid);

		if (!room || room.players.length >= 8) {
			socket.emit("roomNotFound");
			return;
		}

		const player = {
			id: socket.id,
			name: name,
			score: 0,
			status: "WAITING",
			color: colors[Math.floor(Math.random() * colors.length)],
		};
		addPlayer(rid, player);
	});

	socket.on("disconnect", () => {
		const room = getRoomByPlayerSocketId(socket.id);
		if (room) {
			removePlayer(room.id, socket.id);
			roomBroadCast(room.id, {
				event: "roomUpdate",
				data: room,
			});
		}
	});

	socket.on("playerReady", (rid) => {
		const room = getRoom(rid);

		if (!room) {
			return;
		}

		room.state = "AWAITING_PLAYERS";

		// Set player status to ready
		for (var i = 0; i < room.players.length; i++) {
			if (room.players[i].id === socket.id) {
				room.players[i].status = "READY";
				break;
			}
		}

		// Check if all players are ready
		let allReady = true;
		for (var i = 0; i < room.players.length; i++) {
			if (room.players[i].status !== "READY") {
				allReady = false;
				break;
			}
		}

		updateRoom(room);

		// If all players are ready, start the game
		if (allReady) {
			prepareRound(room.id);
		}
	});

	socket.on("roundComplete", (rid, winner, time) => {
		const room = getRoom(rid);

		for (let i = 0; i < room.players.length; i++) {
			if (room.players[i].role === "SPY") {
				if (winner === "SPIES") {
					room.players[i].score += 100;
				}
			} else {
				if (winner === "IMPOSTER") {
					room.players[i].score += 100;
				}
			}
			room.players[i].status = "WAITING";
		}

		room.state = "SCOREBOARD";
		room.lastWinner = winner;

		updateRoom(room);
	});

	socket.on("chatMessage", (rid, playerName, inputText) => {
		const room = getRoom(rid);
		if (!room) {
			return;
		}

		const message = {
			playerName: playerName,
			text: inputText,
		};

		roomBroadCast(rid, {
			event: "chatMessage",
			data: message,
		});
	});
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Running Server at " + port)); // PORT

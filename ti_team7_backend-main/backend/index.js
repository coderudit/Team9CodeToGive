const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const expertsRoute = require("./routes/experts");
const userRoute = require("./routes/userRoute");
const passport = require("passport");
const paymentRoute = require("./routes/paymentsRoute");
const ordersRoute = require("./routes/ordersRoute");
const app = express();
const path = require("path");
const feedRoute = require("./routes/feeds");
const postsRoute = require("./routes/postsRoute");
const http = require("http");
const io = require("socket.io")(http);

dotenv.config();

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(passport.initialize());
require("./middleware/passport")(passport);

// API routes
app.use("/api/experts", expertsRoute);

app.use("/api/users", userRoute);
app.use(paymentRoute);
app.use("/api/feed", feedRoute);
app.use(ordersRoute);
app.use("/api/posts", postsRoute);
// app.get("/", (req, res, next) => {
//   console.log("index route ");
//   res.status(200).json({
//     status: "success",
//   });
// });

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.get("*", function (req, res) {
	console.log("404 - ");
	res.send("404");
});

const PORT = process.env.PORT || 6000;

mongoose
	.connect("mongodb+srv://admin:admin@cluster0.tm9zz.mongodb.net/HappyPlace?retryWrites=true&w=majority")
	.then((result) => {
		console.log("Connected to mongoDB successfully!");
		app.listen(PORT);
		console.log("Server listening on port", PORT);
	})
	.catch((err) => console.log(err));

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
``;

module.exports = app;

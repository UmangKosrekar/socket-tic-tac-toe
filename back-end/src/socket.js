const { Server } = require("socket.io");
const { createRandomString, getRandomBoolean } = require("./helper/common");

const squares = Array(9).fill(null);

const rooms = []; // roomName, playersJoined, turn, squares

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.of("/play").on("connection", playSocket);

  io.on("connection", (socket) => {
    socket.emit("common", { msg: "Welcome" });
    socket.broadcast.emit("common", { msg: "New User joined" });
  });
};

const playSocket = (socket) => {
  const lastRoom = rooms[rooms.length - 1];

  if (lastRoom?.playersJoined < 2) {
    lastRoom.playersJoined = lastRoom.playersJoined + 1;

    socket.join(lastRoom.roomName);
    socket.emit("common", {
      msg: "Welcome to Play",
      room: lastRoom.roomName,
      play: true,
      turn: "X"
    });
    socket
      .to(lastRoom.roomName)
      .emit("common", { msg: "Player has arrived", play: true });
  } else {
    const randomRoom = createRandomString(7);
    rooms.push({
      roomName: randomRoom,
      playersJoined: 1,
      squares,
      turn: getRandomBoolean ? "X" : "O"
    });

    socket.join(randomRoom);
    socket.emit("common", {
      msg: "Welcome to Play",
      room: randomRoom,
      play: false,
      turn: "O"
    });
  }

  socket.on("play", (data) => {
    if (data.roomJoined) {
      const currentRoomIndex = rooms.findIndex(
        (x) => x.roomName === data.roomJoined
      );
      if (rooms[currentRoomIndex].turn != data.turn) {
        socket.emit("common", { msg: "Wait for the other player" });
      } else {
        const currentSquares = rooms[currentRoomIndex].squares.map((x, i) => {
          if (i === data.position) {
            return data.turn;
          } else {
            return x;
          }
        });
        rooms[currentRoomIndex] = {
          ...rooms[currentRoomIndex],
          squares: currentSquares,
          turn: data.turn == "X" ? "O" : "X"
        };
        socket.to(data.roomJoined).emit("play-return", rooms[currentRoomIndex]);
        socket.emit("play-return", rooms[currentRoomIndex]);
      }
    }
  });

  socket.on("restart", (data) => {
    const currentRoomIndex = rooms.findIndex(
      (x) => x.roomName === data.roomJoined
    );
    rooms[currentRoomIndex] = {
      ...rooms[currentRoomIndex],
      squares,
      turn: getRandomBoolean ? "X" : "O"
    };

    socket.emit("play-return", rooms[currentRoomIndex]);
    socket.to(data.roomJoined).emit("play-return", rooms[currentRoomIndex]);

    socket.emit("common", rooms[currentRoomIndex].turn);
    socket.to(data.roomJoined).emit("common", rooms[currentRoomIndex].turn);
  });
};

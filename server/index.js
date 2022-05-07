const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { IsValidPhoneNumber } = require("./helpers");
const uuid = require("uuid");
const http = require("http");

//Konfiguracja Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));
const Dialer = require("dialer").Dialer;

//Konfiguracja Web Sockets
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var clients = [];
io.on("connection", (socket) => {
  console.log("Socket Event: connection");
  socket.on("disconnect", () => {
    console.log("Socket Event: disconnect");
  });
  socket.on("Login", (object) => {
    console.log("Socket Event: Login", object); //Informuj
    const client = { //Utwórz obiekt clienta
      id: uuid.v4(),
      name: object.name,
      phone: object.phone,
    };
    clients.push(client); // Dodaj clienta do tablicy
    socket.emit("Login", client); // poinformuj clienta o otrzymanym unikalnym ID
    socket.emit("ListOfAvailableUsers", clients); // poinformuj nowo zalogowanego o dostępnych użytkownikach
    socket.broadcast.emit("ListOfAvailableUsers", clients); // poinformuj wszystkich o nowym użytkowniku
  });
  socket.on("Logout", (object) => {
    console.log("Socket Event: Login", object); // Informuj
    clients = clients.filter((x) => x.id != object.id); // Zdejmij z tablicy użytkownika o danym ID
    socket.broadcast.emit("ListOfAvailableUsers", clients); // Poinformuj pozostałych zalogowanych o zmianach
  });
  socket.on("Info", (id) => {
    let b = bridges.find((x) => x.id == id); // Znajdź most o odpowiednim ID
    if (typeof b != "undefined" && b != null) {
      /// tbd
    }
  });
});

//Konfiguracja Dialera
Dialer.configure({
  url: "###",
  login: "###",
  password: "###",
});

let bridges = [];
app.get("/clients", (req, rep) => {
  rep.json(clients);
});
app.post("/bridge", async (req, rep) => {
  if (!IsValidPhoneNumber(req.body.source)) {
    rep.send({
      error: true,
      message: "[source] number not valid",
    });
    console.error(`[source] number bad format exception`);
    return;
  }
  if (!IsValidPhoneNumber(req.body.destination)) {
    console.error(`[destination] number bad format exception`);
    rep.send({
      error: true,
      message: "[destination] number not valid",
    });
    return;
  }

  const { source, destination } = req.body;
  try {
    let bridge = await Dialer.call(source, destination);
    let id = uuid.v4();
    bridges.push({
      id,
      bridge,
    });
    console.log(`Bridge ${id} created for ${source} - ${destination}`);
    rep.json({ id: id });
  } catch (Exception) {
    console.error(`Bridge Creation failed ${Exception}`);
    rep.send({
      error: true,
      message: Exception,
    });
  }
});

server.listen(3001);

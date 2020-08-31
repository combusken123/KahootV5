var Kahoot = require("kahoot.js-updated");
const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// console.log(.green("KahootVersion5-Stable, Developed and maintained in repl.it by Cyber Unity. Will spawn around 100 processes."))
// console.log(.red("Use at your own liability."));
// console.log(.yellow("For code enter the Kahoot! code.", "For name type a name for the clients you want to join."))
// console.log("We are now unable to retrieve Kahoot quiz names after a Kahoot update.")

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('sendBots', (data) => {
    var clients = [];
for (var i = 0; i <= 800; ++i) {
  clients[i] = new Kahoot;
}

var code = data.code;
var name = data.name;


socket.emit('message', "Joining kahoot...");
var e = 0;
for (var n in clients) {
  e++;
  clients[n].setMaxListeners(Number.POSITIVE_INFINITY)
  clients[n].join(code, name + e);

  clients[n].on("locked", () => {
    socket.emit('botm', "The quiz has been locked, this client cannot join.")
  })

  clients[n].on("joined", () => {
    socket.emit('botm', "I joined the Kahoot!");
  });
  clients[n].on("disconnect", () => {
    socket.emit('botm', "I have been disconnected from the Kahoot.")
  })
  clients[n].on("quizStart", quiz => {
    socket.emit('botm', "The quiz has started!")
  });
  clients[n].on("questionStart", question => {
    socket.emit('botm', "Answering question...")
    question.answer(Math.floor(Math.random() * 4)); 
  });
  clients[n].on("quizEnd", () => {   
    socket.emit('botm', "The quiz has ended / been kicked.")
  });
  clients[n].on("finish", () => {
    socket.emit('botm', "The Quiz has finished!")
    process.exit(1)
  })
}
  })
});

http.listen(8080, () => {
  console.log('listening on *:8080');
});
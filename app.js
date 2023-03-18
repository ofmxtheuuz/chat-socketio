const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
  console.log("Cliente conectado: " + socket.id)

  socket.on('client_message', (req) => {
    const socket_id = req.id
    const message = req.message

    socket.emit('response_message')
    io.emit('client_message_server', {socket_id, message})
  })
})

http.listen(3333,() => console.log("Listening on port 3333"))
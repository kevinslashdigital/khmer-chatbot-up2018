const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', function (client) {
  

  client.on('message', handleMessage)


  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

server.listen(3010, function (err) {
  if (err) throw err
  console.log('listening on port 3010')
})


const handleMessage = (message, callback) => {

    if(callback) {
        callback(`Hi, I am sarika chatbot, what's your '${message}' mean? I will ask AI to suport this.`)
    }
    
}
const handleDisconnect = () => {
    console.log('handle disconnect')
}
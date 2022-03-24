import { createServer } from 'http'
import Events from 'events'
import { randomBytes } from 'crypto'

const myEvent = new Events()

function getBytes() {
  return randomBytes(10000)
}

function onData(msg) {
  getBytes()
  const items = []

  setInterval(function myInterval() {
    items.push(msg)
  }, 200)
}

function handler(request, response) {
  myEvent.on('data', onData)

  myEvent.emit('data', Date.now())

  response.end('ok')
}

createServer(handler)
  .listen(3000, () => console.log('server is running at 3000'))
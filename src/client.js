import net from 'net'
import DuplexEmitter from 'duplex-emitter'

const server = net.createServer()
const port = process.env.PORT || 8000
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME

const socket = net.connect(port, hostname)
const remoteEmitter = DuplexEmitter(socket)

remoteEmitter.on('msg', onMessage)

function onMessage (msg) {
  console.log(msg)
}

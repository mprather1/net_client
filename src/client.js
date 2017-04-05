import net from 'net'
import DuplexEmitter from 'duplex-emitter'
import logger from 'winston-color'
import chalk from 'chalk'

const s = new net.Socket()
const port = process.env.PORT || 8000
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME

const socket = s.connect(port, hostname)

socket.on('connect', () => {
  logger.info(chalk.magenta('connected...'))
})
socket.on('close', handleClose)
const remoteEmitter = DuplexEmitter(socket)

remoteEmitter.on('msg', onMessage)

function onMessage (msg) {
  logger.info(chalk.yellow('message received...'))
  console.log(msg)
  socket.destroy()
}

function handleClose () {
  logger.info(chalk.cyan('connection closed...'))
}

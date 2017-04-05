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
const emitter = DuplexEmitter(socket)

emitter.on('json-data', onNewData)
emitter.on('confirmaiton', onConfirmation)

function onNewData (data) {
  logger.info(chalk.yellow('data received...'))
  
  console.log(chalk.cyan("Users:"))
  data.users.forEach((user) => {
    console.log(user.name)
  })
  
  console.log(chalk.blue("Data:"))
  data.id.forEach((d) => {
    console.log(d.id)
  })
  
  emitGoodBye("sending goodbye...", function () {
    emitter.emit('complete', 'transfer completed...')
  })
}

function emitGoodBye (message, emit) {
  logger.info(message)
  emit()
}

function onConfirmation (msg) {
  logger.info(msg)
  socket.destroy()
      
}
function handleClose () {
  logger.info(chalk.red('connection closed...'))
}

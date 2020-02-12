// MIT License
// Copyright (C) 2020-Present Shota Matsuda

import Debug from 'debug'
import http from 'http'

import { createApp } from './app'

const debug = Debug('app:index')

function normalizePort (input) {
  const port = parseInt(input, 10)
  if (Number.isNaN(port)) {
    return input
  }
  if (port >= 0) {
    return port
  }
  return false
}

async function main () {
  const port = normalizePort(process.env.PORT || 4000)
  const app = createApp()
  app.set('port', port)
  const server = http.createServer(app)
  server.on('error', error => {
    if (error.syscall !== 'listen') {
      throw error
    }
    const bound = typeof address === 'string' ? `Pipe ${port}` : `Port ${port}`
    switch (error.code) {
      case 'EACCES':
        debug(`${bound} requires elevated privileges`)
        process.exit(1)
        break // eslint-disable-line no-unreachable
      case 'EADDRINUSE':
        debug(`${bound} is already in use`)
        process.exit(1)
        break // eslint-disable-line no-unreachable
      default:
        throw error
    }
  })
  server.on('listening', () => {
    const address = server.address()
    const bound =
      typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`
    debug(`Listening on ${bound}`)
  })
  server.listen(port)
}

main()

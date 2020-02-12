// MIT License
// Copyright (C) 2020-Present Shota Matsuda

import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import Debug from 'debug'
import express from 'express'

import { messages, users } from './data'
import MessagesAPI from './dataSources/MessagesAPI'
import UsersAPI from './dataSources/UsersAPI'
import schema from './schema'

const debug = Debug('app:app')

export function createApp () {
  const app = express()
  app.use(cors())
  app.use(express.json())

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      usersAPI: new UsersAPI(),
      messagesAPI: new MessagesAPI()
    }),
    tracing: true,
    introspection: true
  })
  server.applyMiddleware({ app, path: '/graphql' })

  // Dummy API
  app.use((req, res, next) => {
    debug(`${req.method} ${req.path}`)
    next()
  })
  app.get('/messages', (req, res) => {
    res.send(messages)
  })
  app.get('/users', (req, res) => {
    res.send(users)
  })
  app.get('/message/:id', (req, res) => {
    const message = messages.find(({ id }) => id === +req.params.id)
    if (message == null) {
      res.sendStatus(404)
    }
    res.send(message)
  })
  app.get('/user/:id', (req, res) => {
    const user = users.find(({ id }) => id === +req.params.id)
    if (user == null) {
      res.sendStatus(404)
    }
    res.send(user)
  })

  // Basic 404 handler
  app.use((req, res) => {
    res.sendStatus(404)
  })

  // Basic error handler
  app.use((error, req, res, next) => {
    debug(error)
    res.sendStatus(500)
  })

  return app
}

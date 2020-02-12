// MIT License
// Copyright (C) 2020-Present Shota Matsuda

const express = require('express')
const path = require('path')

function createApp () {
  const app = express()
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(express.static(path.resolve(__dirname, 'dist')))

  // Basic 404 handler
  app.use((req, res) => {
    res.sendStatus(404)
  })

  // Basic error handler
  app.use((error, req, res, next) => {
    console.error(error)
    res.sendStatus(500)
  })

  return app
}

module.exports = { createApp }

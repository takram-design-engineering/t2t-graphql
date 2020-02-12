// MIT License
// Copyright (C) 2020-Present Shota Matsuda

import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import Debug from 'debug'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import './index.scss'

const debug = Debug('app:createApolloClient')

const cache = new InMemoryCache()

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors != null) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      debug(
        `Message: ${message}, Location: %o, Path: %o, Extensions: %o`,
        locations,
        path,
        extensions
      )
    })
  }
  if (networkError != null) {
    debug(`Network Error: ${networkError}`)
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, httpLink])
})

function render () {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  )
}

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./components/App', () => {
    render()
  })
}

render()

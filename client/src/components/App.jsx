// MIT License
// Copyright (C) 2020-Present Shota Matsuda

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'

import classes from './App.scss'

const GET_USER = gql`
  query getUser($id: Int!) {
    user(id: $id) {
      id
      name
    }
  }
`

const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      text
      sender {
        id
        name
      }
      receiver {
        id
        name
      }
    }
  }
`

function User ({ id, prefix }) {
  const { data: { user } = {}, loading } = useQuery(GET_USER, {
    variables: { id }
  })
  return (
    <div className={classes.user}>
      {`${prefix}: `}
      {loading ? null : user.name}
    </div>
  )
}

export default function App () {
  const { data: { messages } = {}, loading } = useQuery(GET_MESSAGES)
  return (
    <div className={classes.messages}>
      {loading
        ? null
        : messages.map(message => (
          <div key={message.id} className={classes.message}>
            <div className={classes.messageText}>{message.text}</div>
            <User id={message.sender.id} prefix='From' />
            <User id={message.receiver.id} prefix='To' />
          </div>
        ))}
    </div>
  )
}

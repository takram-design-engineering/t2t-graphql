// MIT License
// Copyright (C) 2020-Present Shota Matsuda

import gql from 'graphql-tag'
import { delegateToSchema, makeExecutableSchema } from 'graphql-tools'

export const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: Int!): User
    messages: [Message!]!
    message(id: Int!): Message
  }

  type User {
    id: Int!
    name: String!
    sentMessages: [Message!]!
    receivedMessages: [Message!]!
  }

  type Message {
    id: Int!
    text: String
    sender: User!
    receiver: User!
  }
`

export const resolvers = {
  Query: {
    users (parent, args, context, info) {
      const {
        dataSources: { usersAPI }
      } = context
      return usersAPI.getAllUsers()
    },

    user (parent, args, context, info) {
      const {
        dataSources: { usersAPI }
      } = context
      return usersAPI.getUser(args)
    },

    messages (parent, args, context, info) {
      const {
        dataSources: { messagesAPI }
      } = context
      return messagesAPI.getAllMessages()
    },

    message (parent, args, context, info) {
      const {
        dataSources: { messagesAPI }
      } = context
      return messagesAPI.getMessage(args)
    }
  },

  User: {
    async sentMessages ({ id }, args, context, info) {
      const {
        dataSources: { messagesAPI }
      } = context
      const messages = await messagesAPI.getAllMessages()
      return messages.filter(({ senderId }) => senderId === id)
    },

    async receivedMessages ({ id }, args, context, info) {
      const {
        dataSources: { messagesAPI }
      } = context
      const messages = await messagesAPI.getAllMessages()
      return messages.filter(({ receiverId }) => receiverId === id)
    }
  },

  Message: {
    sender ({ senderId }, args, context, info) {
      return delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'user',
        args: { ...args, id: senderId },
        context,
        info
      })
    },

    receiver ({ receiverId }, args, context, info) {
      return delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'user',
        args: { ...args, id: receiverId },
        context,
        info
      })
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema

// MIT License
// Copyright (C) 2020-Present Shota Matsuda

let nextMessageId = 0
let nextUserId = 0

export const messages = [
  {
    id: nextMessageId++,
    text: 'Hello Liam',
    senderId: 0,
    receiverId: 3
  },
  {
    id: nextMessageId++,
    text: 'Hello Olivia',
    senderId: 1,
    receiverId: 2
  },
  {
    id: nextMessageId++,
    text: 'Hello James',
    senderId: 2,
    receiverId: 1
  },
  {
    id: nextMessageId++,
    text: 'Hello Emma',
    senderId: 3,
    receiverId: 0
  }
]

export const users = [
  {
    id: nextUserId++,
    name: 'Emma'
  },
  {
    id: nextUserId++,
    name: 'James'
  },
  {
    id: nextUserId++,
    name: 'Olivia'
  },
  {
    id: nextUserId++,
    name: 'Liam'
  }
]

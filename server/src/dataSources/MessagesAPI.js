// MIT License
// Copyright (C) 2020-Present Shota Matsuda

import { RESTDataSource } from 'apollo-datasource-rest'

export default class MessagesAPI extends RESTDataSource {
  baseURL = 'http://localhost:4000'

  getAllMessages () {
    return this.get('/messages')
  }

  getMessage ({ id }) {
    return this.get(`/message/${id}`)
  }
}

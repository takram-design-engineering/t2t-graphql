// MIT License
// Copyright (C) 2020-Present Shota Matsuda

import { RESTDataSource } from 'apollo-datasource-rest'

export default class UsersAPI extends RESTDataSource {
  baseURL = 'http://localhost:4000'

  getAllUsers () {
    return this.get('/users')
  }

  getUser ({ id }) {
    return this.get(`/user/${id}`)
  }
}

// MIT License
// Copyright (C) 2020-Present Shota Matsuda

process.env.TZ = 'UTC'

if (process.env.NODE_ENV === 'production') {
  require('./lib/index.js')
} else {
  require('./dest/index.js')
}

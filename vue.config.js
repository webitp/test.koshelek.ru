module.exports = {
  axios: {
    baseURL: process.env !== 'production' ? 'http://127.0.0.1:8000/api/' : 'http://127.0.0.1:8000/api/'
  },
  transpileDependencies: [
    'vuetify'
  ]
}

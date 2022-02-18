module.exports = {
  devServer: {
    host: 'localhost',
    proxy: 'http://localhost:8000'
  },
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '',
  crossorigin: 'use-credentials'
}

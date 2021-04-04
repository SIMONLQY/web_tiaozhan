module.exports = {
    devServer: {
      proxy: {
          '/api': {
              target: 'http://127.0.0.5',
              ws: false,
              changeOrigin: true
          },
          '/uploads': {
            target: 'http://127.0.0.5',
            ws: false,
            changeOrigin: true
        },
      }
    // proxy: 'http://127.0.0.7'
    }
  }
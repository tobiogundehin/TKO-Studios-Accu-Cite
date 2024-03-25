const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    webSocketServer: false,
    proxy: {
      "/api": {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' },
      },
    }
  }
})

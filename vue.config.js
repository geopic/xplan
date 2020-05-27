module.exports = {
  publicPath: '/',
  devServer: {
    port: 3000
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/vue/globals.scss";'
      }
    }
  },
  configureWebpack: {
    entry: {
      app: './src/vue/main.ts'
    }
  }
};

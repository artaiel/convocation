module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/main.scss";`
      }
    }
  }
  // configureWebpack:{
  //   optimization: {
  //     splitChunks: {
  //       minSize: 10000,
  //       maxSize: 250000,
  //     }
  //   }
  // }
};
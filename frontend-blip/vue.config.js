module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          quietDeps: true,
        },
      },
      scss: {
        sassOptions: {
          quietDeps: true,
        },
      },
    },
  },
};

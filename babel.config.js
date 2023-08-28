module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    [
      "module-resolver",
      {
        "root": ["./src"],
        alias: {
          '@components':'./src/components',
          '@routes':'./src/routes',
          '@storage':'./src/storage',
          '@theme':'./src/theme',
          '@utils':'./src/utils',
          '@assets':'./src/assets',
        },
      },
     ],
    ],
  };
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],                 // ← importante
        alias: { '@': './src' },
        extensions: ['.ios.js', '.android.js', '.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
      }],
    ],
  };
};

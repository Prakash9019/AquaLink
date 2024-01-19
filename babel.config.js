module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "tailwindcss-react-native/babel",
      'react-native-reanimated/plugin',
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env"
        },
      ],
    ],
  };
};

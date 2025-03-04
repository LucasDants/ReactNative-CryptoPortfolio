module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@/': './src',
            '@/assets': './src/assets',
            '@/components': './src/components',
            '@/config': './src/config',
            '@/database': './src/database',
            '@/routes': './src/routes',
            '@/screens': './src/screens',
            '@/theme': './src/theme',
            '@/types': './src/@types',
            '@/utils': './src/utils',
          },
        },
      ],
      ['react-native-unistyles/plugin'],
      'react-native-reanimated/plugin',
    ],
  };
};

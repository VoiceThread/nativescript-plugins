const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = env => {
  webpack.init(env);
  webpack.useConfig('typescript');

  webpack.chainWebpack(config => {
    // shared demo code
    config.resolve.alias.set('@demo/shared', resolve(__dirname, '..', '..', 'tools', 'demo'));
  });

  // Example if you need to share images across demo apps:
  // webpack.Utils.addCopyRule({
  //   from: '../../../tools/images',
  // 	to: 'images',
  //   context: webpack.Utils.project.getProjectFilePath('node_modules')
  // });
  webpack.Utils.addCopyRule({
    from: '../../../tools/assets/audio',
    to: 'audio',
    context: webpack.Utils.project.getProjectFilePath('node_modules'),
  });

  webpack.Utils.addCopyRule({
    from: '../../../tools/assets/rive',
    to: 'assets/rive',
    context: webpack.Utils.project.getProjectFilePath('node_modules'),
  });

  return webpack.resolveConfig();
};

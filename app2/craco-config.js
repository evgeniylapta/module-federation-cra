const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

const moduleFederationPluginConfiguration = {
  name: 'app2',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: {
    react: { singleton: false, requiredVersion: deps["react"] },
    'react-dom': { singleton: false, requiredVersion: deps["react-dom"] }
  },
}

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output.publicPath = "auto";
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new ModuleFederationPlugin(moduleFederationPluginConfiguration),
      ];

      return webpackConfig;
    }
  }
};

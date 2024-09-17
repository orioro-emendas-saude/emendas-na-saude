module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'production') {
        // Modify output filenames to remove hash
        // We need to remove hash in order to be able
        // to load the script in other environments (such as WP)
        webpackConfig.output.filename = 'static/js/bundle.js'
        webpackConfig.output.chunkFilename = 'static/js/[name].chunk.js'

        // Modify CSS output filenames to remove hash
        const miniCssExtractPlugin = webpackConfig.plugins.find(
          (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
        )

        if (miniCssExtractPlugin) {
          miniCssExtractPlugin.options.filename = 'static/css/bundle.css'
          miniCssExtractPlugin.options.chunkFilename =
            'static/css/[name].chunk.css'
        }
      }
      return webpackConfig
    },
  },
}

module.exports = {
  webpack (config) {
    config.module.rules.push({
      test: /\.(gif|png|jpe?g)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[ext]'
        }
      }]
    })

    return config
  },

  async rewrites () {
    return [
      {
        source: '/prog.png',
        destination: '/api/prog.png'
      }
    ]
  }
}

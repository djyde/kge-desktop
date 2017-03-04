module.exports = {
  entry: {
    app: './src/index'
  },
  output: {
    filename: '[name].bundle.js',
    path: './lib'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}
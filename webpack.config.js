const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js', // Output bundle filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply loader only to JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader for JavaScript files
          options: {
            presets: ['@babel/preset-env'] // Use @babel/preset-env for transpilation
          }
        }
      }
    ]
  },
  
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8080
  }
};

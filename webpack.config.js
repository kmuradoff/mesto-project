const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '',
    },
  
    
    
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    
        open: true // сайт будет открываться сам при запуске npm run dev
    },
  
    module: {
        rules: [
          // rules — это массив правил
          // добавим в него объект правил для бабеля
          {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js?$/i,
            // при обработке этих файлов нужно использовать babel-loader
            use: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
          },
           // добавили правило для обработки файлов
        {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'images/[name].[hash][ext]',
            }
        },
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]',
          },
      },
        {
          // применять это правило только к CSS-файлам
          test: /\.css$/i,
          // при обработке этих файлов нужно использовать
          // MiniCssExtractPlugin.loader и css-loader
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'],
        },
          ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html') // путь к файлу index.html
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
      attributes: {
        id: "target",
        "data-target": "example",
      },
    }),
      
    ],
  };
}

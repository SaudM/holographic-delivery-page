
let path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // publicPath: './audit/',
  publicPath: './user/',
  // publicPath: './',
  devServer: {
    port: 7600,
      open: true,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
      proxy: {
        '/': {//代理api
            target: "https://web.fulitimes.com/",//服务器api地址
            changeOrigin: true,//是否跨域
            ws: true, // proxy websockets
            pathRewrite: {//重写路径3
              "^/": ''
            }
        }
      }
  },
  chainWebpack: config=>{
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('assets',resolve('./src/assets'))　　
    .set('components',resolve('./src/components'))
    .set('request',resolve('./src/request'))
    .set('styles',resolve('./src/styles'))
    .set('utils',resolve('./src/utils'))
    .set('pages',resolve('./src/pages'))
  }
}
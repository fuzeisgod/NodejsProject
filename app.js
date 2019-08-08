// 导入所需模块
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

// 导入路由文件
var router = require('./router.js')

// 创建服务
var app = express()

// 配置开放资源
app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

// 配置 art-template
app.set('views', path.join(__dirname, './views')) // 默认就是 ./views 目录
app.engine('html', require('express-art-template'))

// 配置解析表单 POST 请求体插件(body-parser)
app.use(bodyParser.urlencoded({ extend: false }))
app.use(bodyParser.json())

// 挂载路由
app.use(router)

// 监听启动服务（3000端口）
app.listen(3000, function () {
    console.log('app is running!')
})
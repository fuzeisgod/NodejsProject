var express = require('express')
var path = require('path')

var app = express()
var router = require('./router.js')


app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))


app.set('views', path.join(__dirname, './views')) // 默认就是 ./views 目录
app.engine('html', require('express-art-template'))


app.use(router)

app.listen(3000, function () {
    console.log('app is running!')
})
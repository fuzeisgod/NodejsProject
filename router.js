var express = require('express')

// 创建一个路由容器
var router = express.Router()

router.get('/', function(req, res){
    res.render('index.html')
})

module.exports = router
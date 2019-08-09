var express = require('express')
var User = require('./models/user.js')
var md5 = require('blueimp-md5')

// 创建一个路由容器
var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html')
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {

})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    // 1.获取表单提交的数据
    //   req.body
    // 2.操作数据库
    //   判断该用户是否存在
    //   如果不存在，注册新建用户
    // 3.发送响应
    var body = req.body
    User.findOne({
        $or: [
            { email: body.email },
            { nickname: body.nickname }
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Server error.'
            })
        }
        if (data) {
            // 邮箱或者昵称已存在
            return res.status(200).json({
                err_code: 1,
                message: 'email or nickname already exists.'
            })
        }
        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password))
        
        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Server error.'
                })
            }
            // Express 提供了一个响应方法: json
            // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })


    })
})


module.exports = router
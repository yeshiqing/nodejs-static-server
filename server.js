let http = require('http')
let fs = require('fs')
let url = require('url')
let port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

let server = http.createServer(function (request, response) {
    let parsedUrl = url.parse(request.url, true)
    let pathWithQuery = request.url
    let queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    let path = parsedUrl.pathname
    let query = parsedUrl.query
    let method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    response.statusCode = 200
    let resourcePath = path === '/' ? '/index.html' : path
    // 文件名后缀
    let suffix = resourcePath.substring(resourcePath.lastIndexOf('.'))
    const FILETYPE = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
    }
    let filetype = FILETYPE[suffix] || 'text/html'
    response.setHeader('Content-Type', `${filetype};charset=utf-8`)
    let content = null
    try {
        content = fs.readFileSync(`./public${resourcePath}`)
    } catch (error) {
        if (error.code === 'ENOENT') {
            content = '文件不存在！'
            response.statusCode = 404
        } else {
            throw error
        }
    }
    response.write(content)
    response.end()

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

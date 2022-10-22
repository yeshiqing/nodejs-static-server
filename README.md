# nodejs static server
`/public` 中的文件为静态资源，`server.js` 是服务器端原始代码。

## 启动应用

`node server.js 8888`

在浏览器访问`localhost:8888/<静态资源路径>`

## 后台启动应用

```shell
touch log
node server.js 8888 >log log 2>&1 &
```
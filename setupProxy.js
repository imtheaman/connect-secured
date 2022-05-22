const httpProxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(proxy('/ip', {
        target: 'https://api.db-ip.com/v2/free/self',
        changeOrigin: true
    }))
}
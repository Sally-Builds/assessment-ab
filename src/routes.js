const ROUTES = [
    {
        url: '/customers',
        auth: false,
        proxy: {
            target: "http://localhost:3001/api",
            changeOrigin: true,
            // pathRewrite: {
            //     [`^/customers`]: '',
            // },
        }
    },
    {
        url: '/orders',
        auth: true,
        proxy: {
            target: "http://localhost:3002/api",
            changeOrigin: true,
            // pathRewrite: {
            //     [`^/orders`]: '',
            // },
        }
    },
]

exports.ROUTES = ROUTES;
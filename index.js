const app = require('koa')();
const router = require('./src/router')(app);

router.registerRoutes();

app.listen(process.env.WEB_PORT);

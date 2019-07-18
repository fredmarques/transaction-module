const configs = require('./configs');
const app = require('./app');

app.listen(configs.server.port, () => console.log(`listening at :${configs.server.port}`));

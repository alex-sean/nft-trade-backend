const { registerRoutes: registerAdminRoutes } = require('./admin');

function registerRoutes(app) {
    registerAdminRoutes(app);
}

module.exports = {
    registerRoutes
}
const { registerRoutes: registerAdminRoutes } = require('./admin');
const { registerRoutes: registerBlogRoutes } = require('./blog');

function registerRoutes(app) {
    registerAdminRoutes(app);
    registerBlogRoutes(app);
}

module.exports = {
    registerRoutes
}
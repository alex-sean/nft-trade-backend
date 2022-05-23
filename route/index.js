const { registerRoutes: registerAdminRoutes } = require('./admin');
const { registerRoutes: registerBlogRoutes } = require('./blog');
const { registerRoutes: registerContactRoutes } = require('./contact');
const { registerRoutes: registerPartnerRoutes } = require('./partner');

function registerRoutes(app) {
    registerAdminRoutes(app);
    registerBlogRoutes(app);
    registerContactRoutes(app);
    registerPartnerRoutes(app);
}

module.exports = {
    registerRoutes
}
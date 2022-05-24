const { registerRoutes: registerAdminRoutes } = require('./admin');
const { registerRoutes: registerBlogRoutes } = require('./blog');
const { registerRoutes: registerContactRoutes } = require('./contact');
const { registerRoutes: registerPartnerRoutes } = require('./partner');
const { registerRoutes: registerUserRoutes } = require('./user');

function registerRoutes(app) {
    registerAdminRoutes(app);
    registerBlogRoutes(app);
    registerContactRoutes(app);
    registerPartnerRoutes(app);
    registerUserRoutes(app);
}

module.exports = {
    registerRoutes
}
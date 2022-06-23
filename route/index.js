const { registerRoutes: registerAdminRoutes } = require('./admin');
const { registerRoutes: registerBlogRoutes } = require('./blog');
const { registerRoutes: registerContactRoutes } = require('./contact');
const { registerRoutes: registerPartnerRoutes } = require('./partner');
const { registerRoutes: registerUserRoutes } = require('./user');
const { registerRoutes: registerTokenRoutes } = require('./token');
const { registerRoutes: registerSyncRoutes } = require('./sync');

function registerRoutes(app) {
    registerAdminRoutes(app);
    registerBlogRoutes(app);
    registerContactRoutes(app);
    registerPartnerRoutes(app);
    registerUserRoutes(app);
    registerTokenRoutes(app);
    registerSyncRoutes(app);
}

module.exports = {
    registerRoutes
}
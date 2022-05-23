const { responseInvalid, response } = require('./base');
const { getRegisterBlogParams } = require('./request/blog');
const { verifyToken } = require('./request/base');
const BlogController = require('../controller/blog');
const CONST = require('../common/const');

function registerRoutes(app) {
    app.post('/blog/add', async (req, res) => {
        try {
            const params = getRegisterBlogParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (!await verifyToken(req)) {
                response({
                    status: CONST.RES_CODE.INVALID_JWT,
                    error: 'Invalid JWT Token'
                }, res);
                return;
            }

            if (await BlogController.addBlog(params)) {
                response({
                    status: CONST.RES_CODE.SUCCESS
                }, res);
            } else {
                throw new Error('Internal Server Error');
            }
        } catch (err) {
            response({
                status: CONST.RES_CODE.FAILED,
                error: err.message
            }, res);
        }
    })
}

module.exports = {
    registerRoutes
}
const { responseInvalid, response } = require('./base');
const { 
    getRegisterBlogParams,
    getBlogListParams
} = require('./request/blog');
const { verifyJWT } = require('./base');
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

            if (!await verifyJWT(req, res)) {
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

    app.get('/blog/list', async (req, res) => {
        try {
            const params = getBlogListParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (!await verifyJWT(req, res)) {
                return;
            }

            const result = await BlogController.getBlogList(params);
            if (!result) {
                throw new Error('Internal Server Error');
            }

            response({
                status: CONST.RES_CODE.SUCCESS,
                data: result
            }, res);
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
const { responseInvalid, response } = require('./base');
const { getAdminLoginParams } = require('./request/admin');
const AdminController = require('../controller/admin');
const CONST = require('../common/const');

function registerRoutes(app) {
    app.post('/admin/login', async (req, res) => {
        try {
            const params = getAdminLoginParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const token = await AdminController.adminLogin(params);
            if (token) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        token: token
                    }
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
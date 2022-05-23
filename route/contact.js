const { responseInvalid, response } = require('./base');
const { 
    getRegisterContactParams, getContactListParams
} = require('./request/contact');
const { verifyJWT } = require('./base');
const CONST = require('../common/const');
const ContactController = require('../controller/contact');

function registerRoutes(app) {
    app.post('/contact/add', async (req, res) => {
        try {
            const params = getRegisterContactParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (await ContactController.addContact(params)) {
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

    app.get('/contact/list', async (req, res) => {
        try {
            const params = getContactListParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (!await verifyJWT(req, res)) {
                return;
            }

            const result = await ContactController.getContactList(params);
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
const { responseInvalid, response } = require('./base');
const { 
    getRegisterPartnerParams,
    getPartnerListParams,
    getDeletePartnerParams
} = require('./request/partner');
const { verifyJWT } = require('./base');
const PartnerController = require('../controller/partner');
const CONST = require('../common/const');

function registerRoutes(app) {
    app.post('/partner/add', async (req, res) => {
        try {
            const params = getRegisterPartnerParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (!await verifyJWT(req, res)) {
                return;
            }

            if (await PartnerController.addPartner(params)) {
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

    app.get('/partner/list', async (req, res) => {
        try {
            const params = getPartnerListParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await PartnerController.getPartnerList(params);
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

    app.delete('/partner/delete', async (req, res) => {
        try {
            const params = getDeletePartnerParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (!await verifyJWT(req, res)) {
                return;
            }

            const result = await PartnerController.deletePartner(params);
            if (!result) {
                throw new Error('Internal Server Error');
            }

            response({
                status: CONST.RES_CODE.SUCCESS,
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
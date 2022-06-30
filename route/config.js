const { responseInvalid, response } = require('./base');

const ConfigController = require('../controller/config');
const CONST = require('../common/const');

function registerRoutes(app) {
    app.get('/config/service_fee', async (req, res) => {
        try {
            const result = await ConfigController.getServiceFee();

            if (result !== null) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        serviceFee: result
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
const { responseInvalid, response } = require('./base');
const { 
    getGetActivityByTokenParams, getGetActivityParams,
} = require('./request/activity');
const ActivityController = require('../controller/activity');
const CONST = require('../common/const');

function registerRoutes(app) {
    app.get('/activity/get_by_token', async (req, res) => {
        try {
            const params = getGetActivityByTokenParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const activities = await ActivityController.getActivitiesByToken(params);

            if (activities) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        activities: activities
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

    app.get('/activity/get', async (req, res) => {
        try {
            const params = getGetActivityParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const activities = await ActivityController.getActivity(params);

            if (activities) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        activities: activities
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
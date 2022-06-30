const { responseInvalid, response } = require('./base');
const { 
    getTokenMintSyncParams,
    getOfferSyncParams,
    getCancelOfferSyncParams,
    getAcceptOfferSyncParams,
    getListSyncParams,
    getUnListSyncParams
} = require('./request/sync');
const TokenController = require('../controller/token');
const SyncController = require('../controller/sync');
const CONST = require('../common/const');

function registerRoutes(app) {
    app.get('/sync/mint', async (req, res) => {
        try {
            const params = getTokenMintSyncParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await TokenController.checkMintSynchronization(params.collection, parseInt(params.supply));

            if (result !== null) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: result
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

    app.get('/sync/offer', async (req, res) => {
        try {
            const params = getOfferSyncParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await SyncController.checkOfferSyncStatus(params);

            if (result !== null) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: result
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

    app.get('/sync/cancel_offer', async (req, res) => {
        try {
            const params = getCancelOfferSyncParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await SyncController.checkCancelOfferSyncStatus(params);

            if (result !== null) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: result
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

    app.get('/sync/accept_offer', async (req, res) => {
        try {
            const params = getAcceptOfferSyncParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await SyncController.checkAcceptOfferSyncStatus(params);

            if (result !== null) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: result
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

    app.get('/sync/list', async (req, res) => {
        try {
            const params = getListSyncParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await SyncController.checkListSyncStatus(params);

            if (result !== null) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: result
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

    app.get('/sync/unlist', async (req, res) => {
        try {
            const params = getUnListSyncParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await SyncController.checkUnListSyncStatus(params);

            if (result !== null) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: result
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
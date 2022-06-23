const { responseInvalid, response } = require('./base');
const { 
    getTokenUploadParams,
    getOwnedTokenParams,
    getCreatedTokenParams,
    getSaleTokenParams,
    getOwnedCollectionParams
} = require('./request/token');
const TokenController = require('../controller/token');
const CONST = require('../common/const');

function registerRoutes(app) {
    app.post('/token/upload', async (req, res) => {
        try {
            const params = getTokenUploadParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const url = await TokenController.uploadToken(params);

            if (url) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        tokenURL: url
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

    app.get('/token/owned', async (req, res) => {
        try {
            const params = getOwnedTokenParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const tokens = await TokenController.getOwnedTokens(params.owner);

            if (tokens) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        tokens: tokens
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

    app.get('/token/created', async (req, res) => {
        try {
            const params = getCreatedTokenParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const tokens = await TokenController.getCreatedTokens(params.deployer);

            if (tokens) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        tokens: tokens
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

    app.get('/token/sale', async (req, res) => {
        try {
            const params = getSaleTokenParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const tokens = await TokenController.getSaleTokens(params.owner);

            if (tokens) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        tokens: tokens
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

    app.get('/token/owned_collection', async (req, res) => {
        try {
            const params = getOwnedCollectionParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const tokens = await TokenController.getOwnedCollections(params.owner);

            if (tokens) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        tokens: tokens
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
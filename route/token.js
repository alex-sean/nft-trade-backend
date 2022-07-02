const { responseInvalid, response } = require('./base');
const { 
    getTokenUploadParams,
    getOwnedTokenParams,
    getCreatedTokenParams,
    getSaleTokenParams,
    getOwnedCollectionParams,
    getCollectionParams,
    getCollectionDetailParams,
    getTokensByCollectionParams,
    getTokenDetailParams,
    getLikeCollectionParams,
    getGetLikeCollectionParams,
    getPopularCollectionsParams,
    getFeaturedCollectionsParams
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

            const collections = await TokenController.getOwnedCollections(params.owner);

            if (collections) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        collections: collections
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

    app.get('/token/collection', async (req, res) => {
        try {
            const params = getCollectionParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const collections = await TokenController.getCollections(params.category);

            if (collections) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        collections: collections
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

    app.get('/token/collection_detail', async (req, res) => {
        try {
            const params = getCollectionDetailParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const collection = await TokenController.getCollectionDetail(params.address);

            if (collection) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        collection: collection
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

    app.get('/token/get_by_collection', async (req, res) => {
        try {
            const params = getTokensByCollectionParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const tokens = await TokenController.getTokensByCollection(params.address);

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

    app.get('/token/detail', async (req, res) => {
        try {
            const params = getTokenDetailParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const token = await TokenController.getTokenDetail(params.collectionAddress, params.tokenID);

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

    app.get('/token/hot_bid', async (req, res) => {
        try {
            const tokens = await TokenController.getHotBidItems();

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

    app.get('/token/like_collection', async (req, res) => {
        try {
            const params = getLikeCollectionParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            let status = false;

            if (params.like) {
                status = await TokenController.likeCollection(params);
            } else {
                status = await TokenController.unlikeCollection(params);
            }

            if (status !== undefined) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: status
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

    app.get('/token/like_collection', async (req, res) => {
        try {
            const params = getLikeCollectionParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            let status = false;

            if (params.like) {
                status = await TokenController.likeCollection(params);
            } else {
                status = await TokenController.unlikeCollection(params);
            }

            if (status !== undefined) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: status
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

    app.get('/token/get_like_collection', async (req, res) => {
        try {
            const params = getGetLikeCollectionParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            let status = await TokenController.getLikeCollection(params);

            if (status !== undefined) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        status: status
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

    app.get('/token/get_popular_collections', async (req, res) => {
        try {
            const params = getPopularCollectionsParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            let collections = await TokenController.getPopularCollections(params.from);

            if (collections) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        collections: collections
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

    app.get('/token/get_featured_collections', async (req, res) => {
        try {
            const params = getFeaturedCollectionsParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            let collections = await TokenController.getFeaturedCollections(params);

            if (collections) {
                response({
                    status: CONST.RES_CODE.SUCCESS,
                    data: {
                        collections: collections
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
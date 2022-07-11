const Base = require('./base');

function getTokenUploadParams(req) {
    let params = {};

    if (req.files.token) {
        params.token = req.files.token;
    }

    if (!isValidTokenUploadParams(params)) {
        return null;
    }

    return params;
}

function isValidTokenUploadParams(params) {
    if (!params.token) {
        return false;
    }

    return true;
}

function getOwnedTokenParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidOwnedTokenParams(params)) {
        return null;
    }

    return params;
}

function isValidOwnedTokenParams(params) {
    if (!params.owner) {
        return false;
    }

    return true;
}

function getCreatedTokenParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidCreatedTokenParams(params)) {
        return null;
    }

    return params;
}

function isValidCreatedTokenParams(params) {
    if (!params.deployer) {
        return false;
    }

    return true;
}

function getSaleTokenParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidSaleTokenParams(params)) {
        return null;
    }

    return params;
}

function isValidSaleTokenParams(params) {
    if (!params.owner) {
        return false;
    }

    return true;
}

function getOwnedCollectionParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidOwnedCollectionParams(params)) {
        return null;
    }

    return params;
}

function isValidOwnedCollectionParams(params) {
    if (!params.owner) {
        return false;
    }

    return true;
}

function getCollectionParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidCollectionParams(params)) {
        return null;
    }

    return params;
}

function isValidCollectionParams(params) {
    if (params.category === undefined) {
        return false;
    }

    return true;
}

function getCollectionDetailParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidCollectionDetailParams(params)) {
        return null;
    }

    return params;
}

function isValidCollectionDetailParams(params) {
    if (params.address === undefined) {
        return false;
    }

    return true;
}

function getTokensByCollectionParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidTokensByCollectionParams(params)) {
        return null;
    }

    return params;
}

function isValidTokensByCollectionParams(params) {
    if (params.address === undefined) {
        return false;
    }

    return true;
}

function getTokenDetailParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidTokenDetailParams(params)) {
        return null;
    }

    return params;
}

function isValidTokenDetailParams(params) {
    if (params.collectionAddress === undefined) {
        return false;
    }

    if (params.tokenID === undefined) {
        return false;
    }

    return true;
}

function getLikeCollectionParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (params.like && params.like === 'true') {
        params.like = true;
    } else if (params.like && params.like === 'false') {
        params.like = false;
    }

    if (!isValidLikeCollectionParams(params)) {
        return null;
    }

    return params;
}

function isValidLikeCollectionParams(params) {
    if (params.collectionAddress === undefined) {
        return false;
    }

    if (params.address === undefined) {
        return false;
    }

    if (params.like === undefined) {
        return false;
    }

    return true;
}

function getGetLikeCollectionParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidGetLikeCollectionParams(params)) {
        return null;
    }

    return params;
}

function isValidGetLikeCollectionParams(params) {
    if (params.collectionAddress === undefined) {
        return false;
    }

    if (params.address === undefined) {
        return false;
    }

    return true;
}

function getPopularCollectionsParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (params.like && params.like === 'true') {
        params.like = true;
    } else if (params.like && params.like === 'false') {
        params.like = false;
    }

    if (!isValidGetPopularCollectionsParams(params)) {
        return null;
    }

    return params;
}

function isValidGetPopularCollectionsParams(params) {
    if (!params.from) {
        return false;
    }

    return true;
}

function getFeaturedCollectionsParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidGetFeaturedCollectionsParams(params)) {
        return null;
    }

    return params;
}

function isValidGetFeaturedCollectionsParams(params) {
    if (params.category === undefined) {
        return false;
    }

    return true;
}

function getLikeTokenParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (params.like && params.like === 'true') {
        params.like = true;
    } else if (params.like && params.like === 'false') {
        params.like = false;
    }

    if (!isValidLikeTokenParams(params)) {
        return null;
    }

    return params;
}

function isValidLikeTokenParams(params) {
    if (params.collectionAddress === undefined) {
        return false;
    }

    if (params.address === undefined) {
        return false;
    }

    if (params.tokenID === undefined) {
        return false;
    }

    if (params.like === undefined) {
        return false;
    }

    return true;
}

function getGetLikeTokenParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidGetLikeTokenParams(params)) {
        return null;
    }

    return params;
}

function isValidGetLikeTokenParams(params) {
    if (params.collectionAddress === undefined) {
        return false;
    }

    if (!params.tokenID) {
        return false;
    }

    if (params.address === undefined) {
        return false;
    }

    return true;
}

function getUpdateCollectionStatusParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidUpdateCollectionStatusParams(params)) {
        return null;
    }

    return params;
}


function isValidUpdateCollectionStatusParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.status) {
        return false;
    }

    return true;
}

function getSetFeatureCollectionParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidSetFeatureCollectionParams(params)) {
        return null;
    }

    return params;
}


function isValidSetFeatureCollectionParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.status) {
        return false;
    }

    return true;
}

module.exports = {
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
    getFeaturedCollectionsParams,
    getLikeTokenParams,
    getGetLikeTokenParams,
    getUpdateCollectionStatusParams,
    getSetFeatureCollectionParams
}
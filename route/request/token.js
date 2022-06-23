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

module.exports = {
    getTokenUploadParams,
    getOwnedTokenParams,
    getCreatedTokenParams,
    getSaleTokenParams,
    getOwnedCollectionParams
}
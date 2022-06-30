const Base = require('./base');

function getTokenMintSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidTokenMintSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidTokenMintSyncParams(params) {
    if (!params.collection) {
        return false;
    }

    if (!params.supply) {
        return false;
    }

    return true;
}

function getOfferSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidOfferSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidOfferSyncParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
        return false;
    }

    if (!parseFloat(params.offerAmount)) {
        return false;
    }

    if (!params.owner) {
        return false;
    }

    if (!params.buyer) {
        return false;
    }

    if (!params.asset) {
        return false;
    }

    return true;
}

function getCancelOfferSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidCancelOfferSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidCancelOfferSyncParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
        return false;
    }

    if (!params.owner) {
        return false;
    }

    if (!params.buyer) {
        return false;
    }

    if (!params.asset) {
        return false;
    }

    return true;
}

module.exports = {
    getTokenMintSyncParams,
    getOfferSyncParams,
    getCancelOfferSyncParams
}
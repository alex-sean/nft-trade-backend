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

function getAcceptOfferSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidAcceptOfferSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidAcceptOfferSyncParams(params) {
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

function getListSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidListSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidListSyncParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
        return false;
    }

    if (!params.owner) {
        return false;
    }

    if (!params.listType) {
        return false;
    }

    return true;
}

function getUnListSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidUnListSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidUnListSyncParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
        return false;
    }

    if (!params.owner) {
        return false;
    }

    return true;
}

function getBuySyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidBuySyncParams(params)) {
        return null;
    }

    return params;
}

function isValidBuySyncParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
        return false;
    }

    if (!params.owner) {
        return false;
    }

    return true;
}

function getBidSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidBidSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidBidSyncParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
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

function getCancelBidSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidCancelBidSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidCancelBidSyncParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
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

function getCompleteAuctionSyncParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidCompleteAuctionSyncParams(params)) {
        return null;
    }

    return params;
}

function isValidCompleteAuctionSyncParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
        return false;
    }

    if (!params.buyer) {
        return false;
    }

    return true;
}

module.exports = {
    getTokenMintSyncParams,
    getOfferSyncParams,
    getCancelOfferSyncParams,
    getAcceptOfferSyncParams,
    getListSyncParams,
    getUnListSyncParams,
    getBuySyncParams,
    getBidSyncParams,
    getCancelBidSyncParams,
    getCompleteAuctionSyncParams
}
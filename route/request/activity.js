const Base = require('./base');

function getGetActivityByTokenParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidGetActivityTokenParams(params)) {
        return null;
    }

    return params;
}

function isValidGetActivityTokenParams(params) {
    if (!params.collectionAddress) {
        return false;
    }

    if (!params.tokenID) {
        return false;
    }

    if (!params.category) {
        return false;
    }

    return true;
}

function getGetActivityParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!isValidGetActivityParams(params)) {
        return null;
    }

    return params;
}

function isValidGetActivityParams(params) {
    if (params.filter === undefined) {
        return false;
    }

    if (params.search === undefined) {
        return false;
    }

    if (params.from === undefined) {
        return false;
    }

    if (params.limit === undefined) {
        return false;
    }

    return true;
}

module.exports = {
    getGetActivityByTokenParams,
    getGetActivityParams
}
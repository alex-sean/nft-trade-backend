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

module.exports = {
    getGetActivityByTokenParams
}
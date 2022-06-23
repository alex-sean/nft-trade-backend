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

module.exports = {
    getTokenMintSyncParams,
}
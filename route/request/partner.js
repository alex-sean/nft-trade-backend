const Base = require('./base');

function getRegisterPartnerParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!req.files.thumbnail) {
        return null;
    }

    params.thumbnail = req.files.thumbnail;

    if (!isValidRegisterPartnerParams(params)) {
        return null;
    }

    return params;
}

function isValidRegisterPartnerParams(params) {
    if (!params.title) {
        return false;
    }

    if (!params.description) {
        return false;
    }

    if (!params.url) {
        return false;
    }

    if (!params.thumbnail) {
        return false;
    }

    return true;
}

function getPartnerListParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidPartnerListParams(params)) {
        return null;
    }

    return params;
}

function isValidPartnerListParams(params) {
    if (params.offset === undefined) {
        return false;
    }

    if (params.limit === undefined) {
        return false;
    }

    return true;
}

function getDeletePartnerParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidDeletePartnerParams(params)) {
        return null;
    }

    return params;
}

function isValidDeletePartnerParams(params) {
    if (!params.id) {
        return false;
    }

    return true;
}

module.exports = {
    getRegisterPartnerParams,
    getPartnerListParams,
    getDeletePartnerParams
}
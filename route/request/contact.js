const Base = require('./base');
const validator = require('email-validator');

function getRegisterContactParams(req) {
    const params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidRegisterContactParams(params)) {
        return null;
    }

    return params;
}

function isValidRegisterContactParams(params) {
    if (!params.name) {
        return false;
    }

    if (!params.email) {
        return false;
    }

    if (!validator.validate(params.email)) {
        return false;
    }

    if (!parseInt(params.type)) {
        return false;
    }

    if (!params.content) {
        return false;
    }

    return true;
}

function getContactListParams(req) {
    const params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidContactListParams(params)) {
        return null;
    }

    return params;
}

function isValidContactListParams(params) {
    if (params.offset === undefined) {
        return false;
    }

    if (params.limit === undefined) {
        return false;
    }

    return true;
}

module.exports = {
    getRegisterContactParams,
    getContactListParams
}
const Base = require('./base');

function getAdminLoginParams(req) {
    const params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidGetAdminLoginParams(params)) {
        return null;
    }

    return params;
}

function isValidGetAdminLoginParams(params) {
    if (!params.email) {
        return false;
    }

    if (!params.password) {
        return false;
    }

    return true;
}

module.exports = {
    getAdminLoginParams
}
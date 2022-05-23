const Base = require('./base');

function getRegisterBlogParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!req.files.thumbnail) {
        return null;
    }

    params.thumbnail = req.files.thumbnail;

    if (!isValidRegisterBlogParams(params)) {
        return null;
    }

    return params;
}

function isValidRegisterBlogParams(params) {
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

    if (!params.duration) {
        return false;
    }

    return true;
}

module.exports = {
    getRegisterBlogParams
}
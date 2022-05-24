const Base = require('./base');

function getRegisterUserParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (req.files.avatar) {
        params.avatar = req.files.avatar;
    }

    if (!isValidRegisterUserParams(params)) {
        return null;
    }

    return params;
}

function isValidRegisterUserParams(params) {
    if (!params.name) {
        return false;
    }

    if (!params.description) {
        return false;
    }

    if (!params.email) {
        return false;
    }

    if (!params.address) {
        return false;
    }

    if (!params.twitter_account && !params.instagram_account && !params.own_url) {
        return false;
    }

    return true;
}

function getUserListParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidUserListParams(params)) {
        return null;
    }

    return params;
}

function isValidUserListParams(params) {
    if (params.offset === undefined) {
        return false;
    }

    if (params.limit === undefined) {
        return false;
    }

    return true;
}

function getDeleteUserParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidDeleteUserParams(params)) {
        return null;
    }

    return params;
}

function isValidDeleteUserParams(params) {
    if (!params.id) {
        return false;
    }

    return true;
}

function getUpdateUserParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (req.files.avatar) {
        params.avatar = req.files.avatar;
    }

    if (!isValidUpdateUserParams(params)) {
        return null;
    }

    return params
}

function isValidUpdateUserParams(params) {
    if (!params.address) {
        return false;
    }

    return true;
}

function getUpdateUserStatusParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidUpdateUserStatusParams(params)) {
        return null;
    }

    return params;
}


function isValidUpdateUserStatusParams(params) {
    if (!params.id) {
        return false;
    }

    if (!params.status) {
        return false;
    }

    return true;
}

function getUserParams(req) {
    let params = Base.getParameterFromRequest(req);

    if (!params) {
        return null;
    }

    if (!isValidGetUserParams(params)) {
        return null;
    }

    return params;
}

function isValidGetUserParams(params) {
    if (!params.address) {
        return false;
    }

    return true;
}

module.exports = {
    getRegisterUserParams,
    getUserListParams,
    getDeleteUserParams,
    getUpdateUserParams,
    getUpdateUserStatusParams,
    getUserParams
}
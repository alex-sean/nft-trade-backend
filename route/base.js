const CONST = require('../common/const');
const { verifyToken } = require('./request/base');

function response(ret, res) {
    res.setHeader('content-type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(ret);
}

function responseInvalid(res) {
    const ret = {
        status: CONST.RES_CODE.FAILED,
        error: 'validation failed',
    };
    response(ret, res);
}

async function verifyJWT(req, res) {
    if (!await verifyToken(req)) {
        response({
            status: CONST.RES_CODE.INVALID_JWT,
            error: 'Invalid JWT Token'
        }, res);
        return false;
    }

    return true;
}

module.exports = {
    response,
    responseInvalid,
    verifyJWT
};

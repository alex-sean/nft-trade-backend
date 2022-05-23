const CONST = require('../common/const');

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

module.exports = {
    response,
    responseInvalid,
};

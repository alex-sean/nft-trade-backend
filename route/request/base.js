require('dotenv').config();
const jwt = require('jsonwebtoken');
const AdminModel = require('../../model/admin');

function getParameterFromRequest(req) {
    let params = req.fields;
    if (req.method === 'GET') {
        params = req.query;
    }
    
    return params;
}

async function verifyToken(req) {
    const authToken = req.header('Authorization');

    if (!authToken) {
        return false;
    }

    const tokenInfo = jwt.verify(authToken, process.env.CRYPTO_SALT);
    const admin = await AdminModel.findOne({id: tokenInfo.id, email: tokenInfo.email});
    if (!admin) {
        return false;
    }
    
    if (tokenInfo.expiration < Date.now() / 1000) {
        return false;
    }

    return true;
}

module.exports = {
    getParameterFromRequest,
    verifyToken
}
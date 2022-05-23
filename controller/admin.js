require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const AdminModel = require('../model/admin');

async function adminLogin(params) {
    try {
        const result = await AdminModel.findOne({ email: params.email });
        if (!result) throw new Error('INVALID_EMAIL');

        const password = crypto
            .createHash('sha256')
            .update(`${params.password}${process.env.CRYPTO_SALT}`)
            .digest('hex');
        if (result.password !== password) {
            throw new Error('WRONG_PASSWORD');
        }

        const now = Math.floor(Date.now() / 1000);

        const jwt_token = jwt.sign(
            JSON.stringify({
                id: result.id,
                email: result.email,
                created: now,
                expiration: now + 3600 * 24,
            }),
            process.env.CRYPTO_SALT
        );

        return jwt_token
    } catch (err) {
        throw err;
    }
}

module.exports = {
    adminLogin
}
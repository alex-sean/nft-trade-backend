require('dotenv').config();
const Moralis = require('../services/moralis');

async function getActivitiesByToken(params) {
    try {
        return await Moralis.getActivitiesByToken(params);
    } catch (err) {
        return null;
    }
}

module.exports = {
    getActivitiesByToken
}
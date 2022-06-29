require('dotenv').config();
const Moralis = require('../services/moralis');

async function checkOfferSyncStatus(params) {
    try {
        return await Moralis.getOfferSyncStatus(params);
    } catch (err) {
        return null;
    }
}

module.exports = {
    checkOfferSyncStatus,
}
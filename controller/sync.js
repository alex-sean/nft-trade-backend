require('dotenv').config();
const Moralis = require('../services/moralis');

async function checkOfferSyncStatus(params) {
    try {
        return await Moralis.getOfferSyncStatus(params);
    } catch (err) {
        return null;
    }
}

async function checkCancelOfferSyncStatus(params) {
    try {
        return await Moralis.getCancelOfferSyncStatus(params);
    } catch (err) {
        return null;
    }
}

async function checkAcceptOfferSyncStatus(params) {
    try {
        return await Moralis.getAcceptOfferSyncStatus(params);
    } catch (err) {
        return null;
    }
}

async function checkListSyncStatus(params) {
    try {
        return await Moralis.getListSyncStatus(params);
    } catch (err) {
        return null;
    }
}

async function checkUnListSyncStatus(params) {
    try {
        return await Moralis.getUnListSyncStatus(params);
    } catch (err) {
        return null;
    }
}

async function checkBuySyncStatus(params) {
    try {
        return await Moralis.getBuySyncStatus(params);
    } catch (err) {
        return null;
    }
}

async function checkBidSyncStatus(params) {
    try {
        return await Moralis.getBidSyncStatus(params);
    } catch (err) {
        return null;
    }
}

async function checkCancelBidSyncStatus(params) {
    try {
        return await Moralis.getCancelBidSyncStatus(params);
    } catch (err) {
        return null;
    }
}

module.exports = {
    checkOfferSyncStatus,
    checkCancelOfferSyncStatus,
    checkAcceptOfferSyncStatus,
    checkListSyncStatus,
    checkUnListSyncStatus,
    checkBuySyncStatus,
    checkBidSyncStatus,
    checkCancelBidSyncStatus
}
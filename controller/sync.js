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

module.exports = {
    checkOfferSyncStatus,
    checkCancelOfferSyncStatus,
    checkAcceptOfferSyncStatus,
    checkListSyncStatus,
    checkUnListSyncStatus
}
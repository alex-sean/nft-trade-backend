require('dotenv').config();
const Moralis = require('../services/moralis');
const FileUtils = require('../common/file_util');

async function uploadToken(params) {
    try {
        if (params.token) {
            const token = await FileUtils.uploadFile(params.token, process.env.DIR_TOKEN_THUMBNAIL);
            params.token = process.env.URL_TOKEN + token;
        }

        return params.token;
    } catch (err) {
        return null;
    }
}

async function checkMintSynchronization(collection, supply) {
    try {
        return await Moralis.getMintSyncStatus(collection, supply);
    } catch (err) {
        return null;
    }
}

async function getOwnedTokens(owner) {
    try {
        return await Moralis.getOwnedTokens(owner);
    } catch (err) {
        return null;
    }
}

async function getCreatedTokens(deployer) {
    try {
        return await Moralis.getCreatedTokens(deployer);
    } catch (err) {
        return null;
    }
}

async function getSaleTokens(owner) {
    try {
        return await Moralis.getSaleTokens(owner);
    } catch (err) {
        return null;
    }
}

async function getOwnedCollections(owner) {
    try {
        return await Moralis.getOwnedCollections(owner);
    } catch (err) {
        return null;
    }
}

async function getCollections(category) {
    try {
        return await Moralis.getCollections(category);
    } catch (err) {
        return null;
    }
}

module.exports = {
    uploadToken,
    checkMintSynchronization,
    getOwnedTokens,
    getCreatedTokens,
    getSaleTokens,
    getOwnedCollections,
    getCollections
}
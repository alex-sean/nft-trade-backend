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

async function getCollectionDetail(address) {
    try {
        return await Moralis.getCollectionDetail(address);
    } catch (err) {
        return null;
    }
}

async function getTokensByCollection(address) {
    try {
        return await Moralis.getTokensByCollection(address);
    } catch (err) {
        return null;
    }
}

async function getTokenDetail(collectionAddress, tokenID) {
    try {
        return await Moralis.getTokenDetail(collectionAddress, tokenID);
    } catch (err) {
        return null;
    }
}

async function getHotBidItems() {
    try {
        return await Moralis.getHotBidItems();
    } catch (err) {
        return null;
    }
}

async function likeCollection(params) {
    try {
        return await Moralis.likeCollection(params);
    } catch (err) {
        return null;
    }
}

async function unlikeCollection(params) {
    try {
        return await Moralis.unlikeCollection(params);
    } catch (err) {
        return null;
    }
}

async function getLikeCollection(params) {
    try {
        return await Moralis.getlikeCollection(params);
    } catch (err) {
        return null;
    }
}

async function getPopularCollections(from) {
    try {
        return await Moralis.getPopularCollections(from);
    } catch (err) {
        return null;
    }
}

async function getFeaturedCollections(params) {
    try {
        return await Moralis.getFeaturedCollections(params);
    } catch (err) {
        return null;
    }
}

async function likeToken(params) {
    try {
        return await Moralis.likeToken(params);
    } catch (err) {
        return null;
    }
}

async function unlikeToken(params) {
    try {
        return await Moralis.unlikeToken(params);
    } catch (err) {
        return null;
    }
}

async function getLikeToken(params) {
    try {
        return await Moralis.getLikeToken(params);
    } catch (err) {
        return null;
    }
}

async function verifyCollection(params) {
    try {
        return await Moralis.verifyCollection(address);
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
    getCollections,
    getCollectionDetail,
    getTokensByCollection,
    getTokenDetail,
    getHotBidItems,
    likeCollection,
    unlikeCollection,
    getLikeCollection,
    getPopularCollections,
    getFeaturedCollections,
    likeToken,
    unlikeToken,
    getLikeToken,
    verifyCollection
}
const Moralis = require('moralis/node');
require('dotenv').config();

const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;
const masterKey = process.env.MORALIS_MASTER_KEY;

const initMoralis = async () => {
    await Moralis.start({ serverUrl, appId, masterKey });
}

const call = async (api, params) => {
    return await Moralis.Cloud.run(api, params);
}

const registerUser = async (user) => {
    const params = {
        address: user.address,
        name: user.name,
        avatar: user.avatar? user.avatar: null,
        background: user.background? user.background: null,
        email: user.email,
        description: user.description,
        twitter_account: user.twitter_account,
        instagram_account: user.instagram_account,
        own_url: user.own_url,
        status: false
    };

    return await call('add_user', params);
}

const getUser = async (address) => {
    const params = {
        address: address
    };

    return await call('get_user', params);
}

const updateUser = async (user) => {
    const params = {
        address: user.address,
        name: user.name,
        email: user.email,
        description: user.description,
        twitter_account: user.twitter_account,
        instagram_account: user.instagram_account,
        own_url: user.own_url,
    };

    if (user.avatar) {
        params.avatar = user.avatar;
    }

    if (user.background) {
        params.background = user.background;
    }

    return await call('update_user', params);
}

const updateBackground = async (params) => {
    params = {
        address: params.address,
        background: params.background
    };

    return await call('update_background', params);
}

const getMintSyncStatus = async (collection, supply) => {
    const params = {
        collection: collection,
        supply: supply
    };

    return await call('mint_synchronized', params);
}

const getOwnedTokens = async (owner) => {
    const params = {
        owner: owner
    };

    return await call('get_owned_token', params);
}

const getCreatedTokens = async (deployer) => {
    const params = {
        deployer: deployer
    };

    return await call('get_created_token', params);
}

const getSaleTokens = async (owner) => {
    const params = {
        owner: owner
    };

    return await call('get_sale_token', params);
}

const getOwnedCollections = async (owner) => {
    const params = {
        owner: owner
    };

    return await call('get_owned_collection', params);
}

const getCollections = async (category) => {
    const params = {
        category: category
    };

    return await call('get_collection', params);
}

const getCollectionDetail = async (address) => {
    const params = {
        address: address
    };

    return await call('get_collection_by_address', params);
}

const getTokensByCollection = async (address) => {
    const params = {
        address: address
    };

    return await call('get_tokens_by_collection', params);
}

const getTokenDetail = async (collectionAddress, tokenID) => {
    const params = {
        collectionAddress: collectionAddress,
        tokenID: tokenID,
    };

    return await call('get_token_detail', params);
}

const getOfferSyncStatus = async (offerData) => {
    const params = {
        collectionAddress: offerData.collectionAddress,
        tokenID: offerData.tokenID,
        owner: offerData.owner,
        buyer: offerData.buyer,
        amount: offerData.offerAmount,
        asset: offerData.asset
    };

    return await call('offer_synchronized', params);
}

const getCancelOfferSyncStatus = async (offerData) => {
    const params = {
        collectionAddress: offerData.collectionAddress,
        tokenID: offerData.tokenID,
        owner: offerData.owner,
        buyer: offerData.buyer,
        asset: offerData.asset
    };

    return await call('cancel_offer_synchronized', params);
}

module.exports = {
    initMoralis,
    registerUser,
    getUser,
    updateUser,
    updateBackground,
    getMintSyncStatus,
    getOwnedTokens,
    getCreatedTokens,
    getSaleTokens,
    getOwnedCollections,
    getCollections,
    getCollectionDetail,
    getTokensByCollection,
    getTokenDetail,
    getOfferSyncStatus,
    getCancelOfferSyncStatus
}
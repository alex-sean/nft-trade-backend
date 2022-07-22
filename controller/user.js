require('dotenv').config();
const UserModel = require('../model/user');
const FileUtils = require('../common/file_util');
const CONST = require('../common/const');
const Moralis = require('../services/moralis');

async function addUser(params) {
    try {
        if (params.avatar) {
            const avatar = await FileUtils.uploadFile(params.avatar, process.env.DIR_AVATAR_THUMBNAIL);
            params.avatar = avatar;
        }

        if (params.background) {
            const background = await FileUtils.uploadFile(params.background, process.env.DIR_BACKGROUND_THUMBNAIL);
            params.background = background;
        }

        if (await Moralis.registerUser(params)) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }
}

async function getUserList(params) {
    return await Moralis.getUsers(params);
}

async function getUserLike(params) {
    return await Moralis.getUserLike(params);
}

async function likeUser(params) {
    return await Moralis.likeUser(params);
}

async function deleteUser(params) {
    try {
        return await UserModel.deleteById(params.id);
    } catch (err) {
        return false;
    }
}

async function updateUser(params) {
    try {
        if (params.avatar) {
            const avatar = await FileUtils.uploadFile(params.avatar, process.env.DIR_AVATAR_THUMBNAIL);
            params.avatar = avatar;
        }

        if (params.background) {
            const background = await FileUtils.uploadFile(params.background, process.env.DIR_BACKGROUND_THUMBNAIL);
            params.background = background;
        }

        if (await Moralis.updateUser(params)) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }
}

async function uploadBackground(params) {
    try {
        if (params.background) {
            const background = await FileUtils.uploadFile(params.background, process.env.DIR_AVATAR_THUMBNAIL);
            params.background = background;
        }

        if (await Moralis.updateBackground(params)) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }
}

async function verifyUser(params) {
    try {
        return await Moralis.verifyUser(params);
    } catch (err) {
        return false;
    }
}

async function getUser(address) {
    try {
        let userInfo = await Moralis.getUser(address);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return CONST.USER_EXIST_STATUS.NOT_EXIST;
    } catch (err)  {
        return null;
    }
}

module.exports = {
    addUser,
    getUserList,
    deleteUser,
    updateUser,
    verifyUser,
    getUser,
    uploadBackground,
    getUserLike,
    likeUser
}
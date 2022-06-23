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
    try {
        if (params.name || params.address || params.description || params.status) {
            params.where = {}
            if (params.name)
                params.where.name = ['like', `%${params.name}%`]
            if (params.address)
                params.where.address = ['like', `%${params.address}%`]
            if (params.description)
                params.where.description = ['like', `%${params.description}%`]
            if (params.status)
                params.where.status = params.status
        }

        const users = await UserModel.findAll(params.where, '*', [], params.limit, params.offset);
        const total = await UserModel.getCount(params.where);

        return {
            users: users,
            total: total
        }
    } catch (err) {
        return null;
    }
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

async function verifyUser(id, status = CONST.VERIFY_STATUS.NOT_VERIFIED) {
    try {
        return await UserModel.updateById({status: status}, id);
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
    uploadBackground
}
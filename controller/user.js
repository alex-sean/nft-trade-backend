require('dotenv').config();
const UserModel = require('../model/user');
const FileUtils = require('../common/file_util');
const CONST = require('../common/const');

async function addUser(params) {
    try {
        if (params.avatar) {
            const avatar = await FileUtils.uploadFile(params.avatar, process.env.DIR_AVATAR_THUMBNAIL);
            params.avatar = avatar;
        }

        if (await UserModel.register(params)) {
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

        return await UserModel.updateByAddress(params, params.address);
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
        return await UserModel.findOne({address: address});
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
    getUser
}
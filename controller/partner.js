require('dotenv').config();
const PartnerModel = require('../model/partner');
const FileUtils = require('../common/file_util');

async function addPartner(params) {
    try {
        const thumbPath = await FileUtils.uploadFile(params.thumbnail, process.env.DIR_PARTNER_THUMBNAIL);
        params.thumbnail = thumbPath;

        if (await PartnerModel.register(params)) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }
}

async function getPartnerList(params) {
    try {
        if (params.title || params.content || params.status) {
            params.where = {}
            if (params.title)
                params.where.title = ['like', `%${params.title}%`]
            if (params.content)
                params.where.description = ['like', `%${params.content}%`]
            if (params.status)
                params.where.status = params.status
        }

        const partners = await PartnerModel.findAll(params.where, '*', [], params.limit, params.offset);
        const total = await PartnerModel.getCount(params.where);

        return {
            partners: partners,
            total: total
        }
    } catch (err) {
        return null;
    }
}

async function deletePartner(params) {
    try {
        return await PartnerModel.deleteById(params.id);
    } catch (err) {
        return false;
    }
}

async function updatePartnerStatus(params, list = true) {
    try {
        params.status = list;
        return await PartnerModel.updateById(params, params.id);
    } catch (err) {
        return false;
    }
}

module.exports = {
    addPartner,
    getPartnerList,
    deletePartner,
    updatePartnerStatus
}
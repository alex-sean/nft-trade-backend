const ContactModel = require('../model/contact');

async function addContact(params) {
    try {
        return await ContactModel.register(params);
    } catch (err) {
        return false;
    }
}

async function getContactList(params) {
    try {
        if (params.name || params.email || params.content || params.type || params.status) {
            params.where = {base64: []}
            if (params.name)
                params.where.name = ['like', `%${params.name}%`]
            if (params.email)
                params.where.email = ['like', `%${params.email}%`]
            if (params.content)
                params.where.base64.push(['content', params.content])
            if (params.type)
                params.where.type = params.type
            if (params.status)
                params.where.status = params.status
        }

        const contacts = await ContactModel.findAll(params.where, '*', [], params.limit, params.offset);
        const total = await ContactModel.getCount(params.where);

        return {
            contacts: contacts,
            total: total
        }
    } catch (err) {
        return null;
    }
}

async function replyContact(params) {
    try {
        return await ContactModel.updateById(params, params.id);
    } catch (err) {
        return null;
    }
}

async function getContact(id) {
    try {
        return await ContactModel.findOne({id: id});
    } catch (err)  {
        return null;
    }
}

module.exports = {
    addContact,
    getContactList,
    replyContact,
    getContact
}
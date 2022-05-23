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

module.exports = {
    addContact,
    getContactList,
    replyContact
}
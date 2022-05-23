const ContactController = require('../model/contact');

async function addContact(params) {
    try {
        return await ContactController.register(params);
    } catch (err) {
        return false;
    }
}

async function getContactList(params) {
    try {
        const contacts = await ContactController.findAll(params.where, '*', [], params.limit, params.offset);
        const total = await ContactController.getCount(params.where);

        return {
            contacts: contacts,
            total: total
        }
    } catch (err) {
        return null;
    }
}

module.exports = {
    addContact,
    getContactList,
}
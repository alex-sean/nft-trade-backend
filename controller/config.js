require('dotenv').config();
const Moralis = require('../services/moralis');

async function getServiceFee() {
    try {
        return await Moralis.getServiceFee();
    } catch (err) {
        return null;
    }
}

module.exports = {
    getServiceFee
}
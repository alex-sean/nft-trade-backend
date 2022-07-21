const { response } = require('./base');
const CONST = require('../common/const');
const Base = require('./request/base');
const validator = require('email-validator');
const client = require("@mailchimp/mailchimp_marketing");

function registerRoutes(app) {
    app.post('/subscribe', async (req, res) => {
        try {
            const params = Base.getParameterFromRequest(req);
            let mail_address = params.email
            if (!validator.validate(mail_address)) {
                return false;
            }

            client.setConfig({
                apiKey: process.env.MAILCHIMP_API_KEY,
                server: process.env.MAILCHIMP_PREFIX,
            });
                
                client.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
                    email_address : mail_address,
                    status : 'subscribed'
                }).then(ress => {
                    response({
                        status: CONST.RES_CODE.SUCCESS,
                    }, res);
                }, err => {
                    response({
                        status: CONST.RES_CODE.FAILED,
                        error: err.message
                    }, res);
                })
        } catch (err) {
            response({
                status: CONST.RES_CODE.FAILED,
                error: err.message
            }, res);
        }
    })
}

module.exports = {
    registerRoutes
}
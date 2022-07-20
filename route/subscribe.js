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
                apiKey: CONST.MailChimp.api_key,
                server: CONST.MailChimp.server_prefix,
            });
                
            client.lists.addListMember(CONST.MailChimp.audience_id, {
                email_address : mail_address,
                status : 'subscribed'
            }).then((res) => {
                response({
                    status: CONST.RES_CODE.SUCCESS,
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
const MYSQL_ERR_NO = {
    CONNECTION_ERROR: -4078,
};

const RES_CODE = {
    SUCCESS: 200,
    FAILED: 400,
    INVALID_JWT: 401
};

const CONTACT_STATUS = {
    PENDING: 0,
    REPLIED: 1
};

const VERIFY_STATUS = {
    NOT_VERIFIED: 0,
    VERIFIED: 1
};

const USER_EXIST_STATUS = {
    NOT_EXIST: 0,
    EXIST: 1
};

const MailChimp = {
    api_key: 'f347e3c49863ad85b76e0e74d69e32ca-us6',
    audience_id: '4829b77d8f',
    server_prefix: 'us6',
}

module.exports = {
    MYSQL_ERR_NO,
    RES_CODE,
    CONTACT_STATUS,
    VERIFY_STATUS,
    USER_EXIST_STATUS,
    MailChimp,
}
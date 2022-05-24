const { responseInvalid, response } = require('./base');
const { 
    getRegisterUserParams,
    getUserListParams,
    getDeleteUserParams,
    getUpdateUserParams,
    getUpdateUserStatusParams,
    getUserParams
} = require('./request/user');
const { verifyJWT } = require('./base');
const UserController = require('../controller/user');
const CONST = require('../common/const');

function registerRoutes(app) {
    app.post('/user/add', async (req, res) => {
        try {
            const params = getRegisterUserParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (await UserController.addUser(params)) {
                response({
                    status: CONST.RES_CODE.SUCCESS
                }, res);
            } else {
                throw new Error('Internal Server Error');
            }
        } catch (err) {
            response({
                status: CONST.RES_CODE.FAILED,
                error: err.message
            }, res);
        }
    })

    app.get('/user/list', async (req, res) => {
        try {
            const params = getUserListParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (!await verifyJWT(req, res)) {
                return;
            }

            const result = await UserController.getUserList(params);
            if (!result) {
                throw new Error('Internal Server Error');
            }

            response({
                status: CONST.RES_CODE.SUCCESS,
                data: result
            }, res);
        } catch (err) {
            response({
                status: CONST.RES_CODE.FAILED,
                error: err.message
            }, res);
        }
    })

    app.delete('/user/delete', async (req, res) => {
        try {
            const params = getDeleteUserParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (!await verifyJWT(req, res)) {
                return;
            }

            const result = await UserController.deleteUser(params);
            if (!result) {
                throw new Error('Internal Server Error');
            }

            response({
                status: CONST.RES_CODE.SUCCESS,
            }, res);
        } catch (err) {
            response({
                status: CONST.RES_CODE.FAILED,
                error: err.message
            }, res);
        }
    })

    app.post('/user/update', async (req, res) => {
        try {
            const params = getUpdateUserParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await UserController.updateUser(params);
            if (!result) {
                throw new Error('Internal Server Error');
            }

            response({
                status: CONST.RES_CODE.SUCCESS,
            }, res);
        } catch (err) {
            response({
                status: CONST.RES_CODE.FAILED,
                error: err.message
            }, res);
        }
    })

    app.post('/user/verify', async (req, res) => {
        try {
            const params = getUpdateUserStatusParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            if (!await verifyJWT(req, res)) {
                return;
            }

            const result = await UserController.verifyUser(params.id, params.status);
            if (!result) {
                throw new Error('Internal Server Error');
            }

            response({
                status: CONST.RES_CODE.SUCCESS,
            }, res);
        } catch (err) {
            response({
                status: CONST.RES_CODE.FAILED,
                error: err.message
            }, res);
        }
    })

    app.get('/user/detail', async (req, res) => {
        try {
            const params = getUserParams(req);

            if (!params) {
                responseInvalid(res);
                return;
            }

            const result = await UserController.getUser(params.address);
            if (!result) {
                throw new Error('Internal Server Error');
            }

            response({
                status: CONST.RES_CODE.SUCCESS,
                data: result
            }, res);
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
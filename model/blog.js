const Base = require('./base');

const _table_ = 'tbl_blog';

async function register(params) {
    let connection = null;
    try {
        const query = Base.createQuery()
            .selectTable(_table_)
            .insert(params)
            .result();

        connection = await Base.connect();
        await Base.startTransaction(connection);
        await Base.mysqlExecute(connection, query);
        await Base.commitTransaction(connection);
        await connection.release();

        return true;
    } catch (ex) {
        Base.onConnectionErr(connection, ex.errno);
        return false;
    }
}

async function updateById(params, id) {
    let connection = null;
    try {
        const query = Base.createQuery()
            .selectTable(_table_)
            .update(params)
            .where({ id })
            .result();

        connection = await Base.connect();
        await Base.startTransaction(connection);
        await Base.mysqlExecute(connection, query);
        await Base.commitTransaction(connection);
        await connection.release();

        return true;
    } catch (ex) {
        Base.onConnectionErr(connection, ex.errno);
        return ex.messsage;
    }
}

async function findOne(params) {
    let connection = null;
    try {
        const query = Base.createQuery()
            .selectTable(_table_)
            .select('*')
            .where(params)
            .result();

        connection = await Base.connect();
        const res = await Base.mysqlFetch(connection, query);
        await connection.release();
        if (res.length > 0) {
            return res[0];
        }
        return null;
    } catch (ex) {
        Base.onConnectionErr(connection, ex.errno);
        return null;
    }
}

async function findAll(params, select = '*', orderBy = '', limit = undefined, offset = undefined) {
    let connection = null;
    try {
        const query = Base.createQuery()
            .selectTable(_table_)
            .select(select)
            .where(params)
            .orderby(orderBy)
            .limit(limit, offset)
            .result();

        connection = await Base.connect();
        const res = await Base.mysqlFetch(connection, query);
        await connection.release();
        return res;
    } catch (ex) {
        Base.onConnectionErr(connection, ex.errno);
        return null;
    }
}

async function getCount(params) {
    let connection = null;
    try {
        const query = Base.createQuery()
            .selectTable(_table_)
            .select('*')
            .where(params)
            .result();

        connection = await Base.connect();
        const res = await Base.mysqlFetch(connection, query);
        await connection.release();
        return res.length;
    } catch (ex) {
        Base.onConnectionErr(connection, ex.errno);
        return null;
    }
}

async function deleteById(id) {
    let connection = null;
    try {
        const query = Base.createQuery()
            .selectTable(_table_)
            .deleteFrom()
            .where({
                id: id
            })
            .result();

        connection = await Base.connect();
        const res = await Base.mysqlFetch(connection, query);
        await connection.release();
        return res;
    } catch (ex) {
        Base.onConnectionErr(connection, ex.errno);
        return null;
    }
}

module.exports = {
    register,
    findOne,
    updateById,
    findAll,
    deleteById,
    getCount
};

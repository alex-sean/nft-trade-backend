const Base = require('./base');

const _table_ = 'tbl_admin';

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

module.exports = {
    findOne,
};

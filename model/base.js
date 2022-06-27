const CONST = require('../common/const');

/* eslint-disable */
async function connect() {
    return new Promise((resolve, reject) => {
        mysqlPool
            .getConnection()
            .then((connection) => {
                resolve(connection);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/* eslint-enable */

async function startTransaction(connection) {
    const command = 'START TRANSACTION';
    await connection.query(command);
}

async function commitTransaction(connection) {
    const command = 'COMMIT';
    await connection.query(command);
}

async function rollbackTransaction(connection) {
    const command = 'ROLLBACK';
    await connection.query(command);
}

async function onConnectionErr(connection, err, isRollBack = false) {
    console.log(err);
    if (connection == null) return;
    if (err.errono === CONST.MYSQL_ERR_NO.CONNECTION_ERROR) return;
    if (isRollBack) await rollbackTransaction(connection);
    connection.release();
}

async function mysqlExecute(connection, command, params = []) {
    // let stringify_params = [];
    // for (let i = 0; i < params.length; i++) {
    //     stringify_params.push(params[i].toString());
    // }

    return await connection.query(command, params);
}

async function mysqlFetch(connection, command, params = []) {
    const res = await connection.query(command, params);
    return res[0];
}

function createQuery() {
    this._table_ = '';
    this._query_ = '';
    return this;
}

function selectTable(table) {
    this._table_ = table;
    return this;
}

function insert(params) {
    this._query_ = `INSERT INTO \`${this._table_}\`(`;
    const keys = Object.keys(params);
    keys.forEach((key) => {
        this._query_ += `\`${key}\``;
        if (keys.indexOf(key) === keys.length - 1) {
            this._query_ += ')';
        } else {
            this._query_ += ',';
        }
    });

    this._query_ += ' VALUE (';
    keys.forEach((key) => {
        this._query_ += `'${params[key]}'`;
        if (keys.indexOf(key) === keys.length - 1) {
            this._query_ += ')';
        } else {
            this._query_ += ',';
        }
    });

    return this;
}

function select(params) {
    this._query_ = 'SELECT ';
    if (params === '*') {
        this._query_ += `* FROM \`${this._table_}\``;
    } else {
        for (let i = 0; i < params.length; i++) {
            if (Array.isArray(params[i])) {
                if (params[i][1] === '*') {
                    this._query_ += `\`${params[i][0]}\`.${params[i][1]}`;
                } else {
                    if (params[i].length >= 3) {
                        this._query_ += `\`${params[i][0]}\`.\`${params[i][1]}\` as ${params[i][2]}`;
                    } else {
                        this._query_ += `\`${params[i][0]}\`.\`${params[i][1]}\``;
                    }
                }
            } else {
                this._query_ += `\`${params[i]}\``;
            }
            if (i !== params.length - 1) {
                this._query_ += ',';
            }
        }
        this._query_ += ` FROM \`${this._table_}\``;
    }
    return this;
}

function selectCount(params) {
    this._query_ = 'SELECT ';
    if (params === undefined || params.length === 0) {
        this._query_ = `SELECT COUNT(${this._table_}.id) as total FROM \`${this._table_}\``;
    } else if (params === '*') {
        this._query_ += `*, COUNT(${this._table_}.id) as total FROM \`${this._table_}\``;
    } else {
        for (let i = 0; i < params.length; i++) {
            if (Array.isArray(params[i])) {
                if (params[i][1] === '*') {
                    this._query_ += `\`${params[i][0]}\`.${params[i][1]}`;
                } else {
                    if (params[i].length >= 3) {
                        this._query_ += `\`${params[i][0]}\`.\`${params[i][1]}\` as ${params[i][2]}`;
                    } else {
                        this._query_ += `\`${params[i][0]}\`.\`${params[i][1]}\``;
                    }
                }
            } else {
                this._query_ += `\`${params[i]}\``;
            }
            if (i !== params.length - 1) {
                this._query_ += ',';
            }
        }
        this._query_ += `, COUNT(${this._table_}.id) as total FROM \`${this._table_}\``;
    }
    return this;
}

function update(params) {
    const keys = Object.keys(params);

    if (!keys.length) return this;

    this._query_ = `UPDATE \`${this._table_}\` SET `;
    for (let i = 0; i < keys.length; i++) {
        this._query_ += `\`${keys[i]}\`='${params[keys[i]]}'`;
        if (i !== keys.length - 1) {
            this._query_ += ',';
        }
    }
    return this;
}

function deleteFrom() {
    this._query_ = `DELETE FROM \`${this._table_}\``;
    return this;
}

function join(tableName, on) {
    this._query_ += ` LEFT JOIN ${tableName} ON `

    const onKeys = Object.keys(on);
    for (let i = 0; i < onKeys.length; i++) {
        this._query_ += `${onKeys[i]} = ${on[onKeys[i]]} AND `
    }

    this._query_ = this._query_.slice(0, this._query_.length - 5);
    return this;
}

function where(params) {
    if (params === undefined || (Object.keys(params).length === 0 && params.length === 0)) return this;

    this._query_ += ' WHERE ';
    for (let i = 0; i < Object.keys(params).length; i++) {
        const key = Object.keys(params)[i];
        if (key == 'base64') {
            for (var ii in params[key]) {
                var r = params[key][ii]
                if (ii > 0)
                    this._query_ += ' AND '
                this._query_ += `FROM_BASE64(\`${r[0]}\`) LIKE '%${r[1]}%'`
            }
        } else if (Array.isArray(params[key])) {
            this._query_ += `\`${key}\` ${params[key][0]} '${params[key][1]}'`;
        } else if (typeof params[key] !== 'string' && Object.keys(params[key]).length > 0) {
            subKeys = Object.keys(params[key]);
            for (let j = 0; j < subKeys.length; j++) {
                if (subKeys[j] === '$gte') {
                    this._query_ += `\`${key}\`>FROM_UNIXTIME(${params[key][subKeys[j]]})`;
                } else if (subKeys[j] === '$lte') {
                    this._query_ += `\`${key}\`<FROM_UNIXTIME(${params[key][subKeys[j]]})`;
                } else {
                    this._query_ += `\`${key}\`='${params[key]}'`;
                }

                if (j !== subKeys.length - 1) {
                    this._query_ += ' AND ';
                }
            }
        } else {
            if (typeof params[key] === 'string') {
                this._query_ += `\`${key}\`='${params[key]}'`;
            } else {
                this._query_ += `\`${key}\`=${params[key]}`;
            }
            
        }

        if (i !== Object.keys(params).length - 1) {
            this._query_ += ' AND ';
        }
    }
    return this;
}

function having(params) {
    if (params === undefined ||  Object.keys(params).length === 0 || params.length === 0) return this;

    this._query_ += ' HAVING ';
    for (let i = 0; i < Object.keys(params).length; i++) {
        const key = Object.keys(params)[i];
        if (Array.isArray(params[key])) {
            this._query_ += `\`${key}\` ${params[key][0]} '${params[key][1]}'`;
        } else {
            this._query_ += `\`${key}\`='${params[key]}'`;
        }

        if (i !== Object.keys(params).length - 1) {
            this._query_ += ' AND ';
        }
    }
    return this;
}

function orderby(params) {
    if (params.length === 0) return this;
    this._query_ += ' ORDER BY ';
    for (let i = 0; i < params.length; i++) {
        this._query_ += `\`${params[i][0]}\` ${params[i][1]}`;
        if (i !== params.length - 1) {
            this._query_ += ',';
        }
    }
    return this;
}

function limit(limitCnt, offset = 0) {
    if (limitCnt === undefined || offset === undefined)
        return this;
    this._query_ += ` LIMIT ${offset},${limitCnt}`;
    return this;
}

function result() {
    return this._query_;
}

module.exports = {
    connect,
    startTransaction,
    commitTransaction,
    rollbackTransaction,
    onConnectionErr,
    mysqlExecute,
    mysqlFetch,
    createQuery,
    selectTable,
    insert,
    result,
    select,
    selectCount,
    where,
    having,
    update,
    orderby,
    deleteFrom,
    limit,
    join
};

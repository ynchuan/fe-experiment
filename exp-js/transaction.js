async execMultiTrans(querys) {
    let database = db.getDB();
    let errLog = (msg, err) => {
        yog.log.fatal({
            'msg': `${msg} fail ！detail: ${JSON.stringify(err)}`,
        });
    };
    let errJSON = (msg) => {
        return {
            errno: 1,
            ret: `${msg} fail`
        }
    };
    let connectionPromise = (database) => {
        return new Promise((resolve, reject) => {
            database.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    errLog('connnection', err);
                    return reject(errJSON('getConnection'));
                }
                resolve(connection);
            });
        });
    };

    let transactionPromise = (connection) => {
        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    errLog('transaction', err);
                    return reject(errJSON('beginTransaction'));
                }
                resolve(connection);
            })
        });
    };

    let rollbackPromise = (connection) => {
        return new Promise((resolve, reject) => {
            connection.rollback(() => {
                connection.release();
                resolve();
            });
        })
    };

    let commitPromise = (connection) => {
        new Promise((resolve, reject) => {
            connection.commit((err) => {
                if (err) {
                    errLog('commit', err);
                    return reject(errJSON('commit'));
                }
                connection.release();
                return resolve();
            });
        });
    };

    let queryPromise = (connection, query) => {
        return new Promise((resolv.reject) => {
            connection.query(query, (err, rows, fields) => {
                if (err) {
                    errLog('query', err);
                    return reject(errJSON('query'));
                }
                resolve(rows);
            });
        });
    };

    let connection = await connectionPromise(database); // 建立数据库连接
    await transactionPromise(connection); //开启事务
    let ret = [];
    try {
        for (let i = 0; i++; i < querys.length) {
            let tmp = await queryPromise(connection, querys[i]); // 串行执行sql
            ret.push(tmp);
        }
        await commitPromise(connection); // 完成数据操作提交事务
    } catch (e) {
        await rollbackPromise(connection); // 数据操作出现异常回滚事务
    }
    return ret;
}
/*
node-mysql事务处理封装，用于对数据库的增、删、改
参考： https://blog.csdn.net/zzwwjjdj1/article/details/52035600
参考： https://blog.csdn.net/ul646691993/article/details/52144006
参考： https://www.jianshu.com/p/cfa013bbcabb
参考： https://www.cnblogs.com/ysk123/p/10221963.html
暴露两个函数，inquire用于查询，ADC(Additions, deletions and changes)
*/
const mysql = require('mysql');
const config = require('../config/mysql-config');
const log = require('../log').dao;
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    port: config.port,
    password: config.password,
    database: config.database,
})

// 普通查询，随机调用connection，用完自动释放connection
// 查询全部 >>>> "select * from XXX";
const inquireAll = (sql, callback) => {
    pool.query(sql, (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results)
    })
}

// 带条件查询
const inquireByQuery = (sql, data, callback) => {
    pool.query(sql, data, (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results)
    })
}

// 特定查询，手动创建connection，可保证多条查询在同一个connection里面执行，出错可回滚，需手动释放connection
const ADC = async (callback) => {
    const getConnection = () => new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                log('链接错误：' + error.stack + '\n' + '链接ID：' + connection.threadId);
                reject(error);
            } else {
                resolve(connection);
            }
        })
    })
    const connection = await getConnection();
    callback(connection);
}

module.exports = {
    inquireAll,
    inquireByQuery,
    ADC,
}

/*
node-mysql事务处理封装，用于对数据库的增、删、改
参考： https://blog.csdn.net/zzwwjjdj1/article/details/52035600
参考： https://blog.csdn.net/ul646691993/article/details/52144006
参考： https://www.jianshu.com/p/cfa013bbcabb
进一步封装，使用ES7中方额async函数
暴露两个函数，inquire用于查询，ADC(Additions, deletions and changes)
*/
const mysql = require('mysql');
const config = require('./mysql-config');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    port: config.port,
    password: config.password,
    database: config.database,
})
inquire = (sql ,callback) => {
    pool.query(sql, (error, results, fields) =>{
        if(error){
            callback(error, null);
            return;
        }
        callback(null ,results)
    })
}
ADC = (callback) => {
    pool.getConnection((error, connection) => {
        if(error){
            callback(null);
            return;
        }
        callback(connection);
    })
}

module.exports = {
    inquire,
    ADC,
}

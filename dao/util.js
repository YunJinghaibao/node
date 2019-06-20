/*
参考： https://blog.csdn.net/zzwwjjdj1/article/details/52035600
参考： https://www.jianshu.com/p/cfa013bbcabb
参考： https://www.cnblogs.com/ysk123/p/10221963.html
插入(INSERT)、修改(UPDATE)、删除(DELETE)操作成功可由results.protocol41是否为true来判断，插入(INSERT)后的数据
id可由results.insertid获得
*/
const mysql = require('mysql');
const MySQLConfig = require('../config/mysql-config');
class DBO extends MySQLConfig {
    constructor(){
        super();
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: this.host,
            user: this.user,
            port: this.port,
            password: this.password,
            database: this.database,
        });
    }
    /* 无条件查询 */
    uncin(sql, callback) {
        this.pool.query(sql, (error, result, fields) => {
            if(error){
                callback(error, null);
            }else {
                callback(null, result);
            }
        })
    }
    /* 简单条件查询 condition = [] */
    simcin(sql, condition, callback) {
        this.pool.query(sql, condition, (error, result, fields) => {
            if(error){
                callback(error, null);
            }else {
                callback(null, result);
            }
        })
    }
    /* 事务中各任务无联系 */
    /* 事务connection */
    simTran(callback) {
        const getConnection = () => new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if(error){
                    reject('链接错误：' + error.stack + '\n' + '链接ID：' + connection.threadId + ' ' + new Date().toLocaleString());
                }else{
                    resolve(connection);
                }
            })
        })
        getConnection()
        .then(connection => {
            callback(connection);
        })
        .catch(error => {
            console.log(error)
        })
    }
    /* 执行任务函数 */
    doTask(task, connection){
        return new Promise((resolve, reject) => {
            connection.query(task.sql, task.query, (error, result, field) => {
                if(error){
                    reject(error);
                }else{
                    if(result.protocol41){
                        console.log('是插入或修改或删除操作---------------- 070 '.black.bgGreen + ' ' + new Date().toLocaleString().black.bgBlue);
                        resolve('success');
                    }else{
                        console.log('是查询操作---------------------------- 073 '.black.bgGreen + ' ' + new Date().toLocaleString().black.bgBlue);
                        resolve(result);
                    }
                }
            })
        })
    }
    /* 任务队列 */
    taskQueue(taskQueue = [], callback, connection){
        Promise.all(taskQueue)
        .then(results => {
            let data = [];
            for(let result of results){
                if(result === 'success'){
                    console.log('插入或修改或删除成功------------------ 087 '.black.bgGreen + ' ' + new Date().toLocaleString().black.bgBlue);
                }else{
                    data.push(result[0]);
                }
            }
            if(data.length){
                callback(null, data);
            }else{
                callback(null, 'success');
            }
            connection.commit(error => {
                if(error){
                    console.log('提交失败----------------------------- 099 '.black.bgGreen + ' ' + new Date().toLocaleString().black.bgBlue);
                    return;
                }
                connection.release();
            })
        })
        .catch(error => {
            if(error){
                console.log('出现错误，数据库回滚------------------ 107 '.black.bgGreen + ' ' + new Date().toLocaleString().black.bgBlue);
                connection.rollback(() => {
                    connection.release();
                })
            }
        })
    }
}

module.exports = { DBO };

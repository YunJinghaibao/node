const db = require('../util');

const test1 = (query, fn) => {
    // let sql = "SELECT * FROM `user` WHERE name = ?";
    // let data = [query.name];
    // let sql = "DELETE FROM `user` WHERE id = ?"
    // let data = [26];
    // let sql = "UPDATE `user` SET name = 'jysiyuanhaibao' WHERE id = ?;"
    // let data = [28];
    let sql = "INSERT INTO `user` (name) VALUES (?)"
    let data = ["haibaotest"];
    db.inquireByQuery(sql, data, (error, results, fields) => {
        if(error){
            fn(error, null);
        }else{
            console.log(new Date().toLocaleString());
            console.log(results);
            fn(null, results);
        }
    })
}
// protocol41
const test2 = ({}, fn) => {
    let sql = "SELECT * FROM `user`";
    db.inquireAll(sql, (error, results, fields) => {
        if(error){
            fn(error, null);
        }else{
            fn(null, results);
        }
    })
}

const test = (query, fn) => {
    console.log(query.name);
    db.ADC(connection => {
        connection.beginTransaction(error => {
            if(error){
                fn(error, null);
            }else{
                const task1 = new Promise((resolve, reject) => {
                    let sql = "SELECT * FROM `user` WHERE name = ?";
                    let data = [query.name];
                    connection.query(sql, data, (error, results, fields) => {
                        if(error){
                            reject(error);
                            return;
                        }else{
                            resolve(results);
                        }
                    })
                });
                const task2 = new Promise((resolve, reject) => {
                    let sql = "SELECT * FROM `user` WHERE id = ?";
                    let data = [query.age];
                    connection.query(sql, data, (error, results, fields) => {
                        if(error){
                            reject(error);
                            return;
                        }else{
                            resolve(results);
                        }
                    })
                });
                Promise.all([task1, task2])
                .then(([a, b]) => {
                    // console.log(a);//[ RowDataPacket { id: 2, name: 'haibao' } ]
                    // console.log(b);//[ RowDataPacket { id: 2, name: 'haibao' } ]
                    let data = [a[0], b[0]];
                    fn(null, data);
                    connection.commit(error => {
                        if(error){
                            return;
                        }
                        connection.release();
                    })
                })
                .catch(error => {
                    if(error){
                        connection.rollback(() => {
                            connection.release();
                        })
                    }
                })
            }
        })
    })
}
const testo = (query, fn) => {
    db.ADC(connection => {
        connection.beginTransaction(error => {
            if(error){
                fn(error, null);
            }else{
                // const task1 = new Promise((resolve, reject) => {
                //     let sql = "SELECT * FROM `user` WHERE name = ?";
                //     let data = [query[0].name];
                //     connection.query(sql, data, (error, results, fields) => {
                //         if(error){
                //             reject(error);
                //             return;
                //         }else{
                //             resolve(results);
                //         }
                //     })
                // });
                const task2 = new Promise((resolve, reject) => {
                    // let sql = "SELECT * FROM `user` WHERE name = ?";
                    // let data = [query[1].name];
                    let sql = "INSERT INTO `user` (name) VALUES (?)"
                    let data = ["haibaotest"];
                    connection.query(sql, data, (error, results, fields) => {
                        if(error){
                            reject(error);
                            return;
                        }else{
                            console.log(new Date().toLocaleString());
                            console.log(results.protocol41);
                            resolve(results);
                        }
                    })
                });
                // Promise.all([task1, task2])
                // .then(([a, b]) => {
                    // console.log(a);//[ RowDataPacket { id: 2, name: 'haibao' } ]
                    // console.log(b);//[ RowDataPacket { id: 2, name: 'haibao' } ]
                    // let data = [a， b];
                Promise.all([task2])
                .then(([a]) => {
                    let data = [a];
                    fn(null, data);
                    connection.commit(error => {
                        if(error){
                            return;
                        }
                        connection.release();
                    })
                })
                .catch(error => {
                    if(error){
                        connection.rollback(() => {
                            connection.release();
                        })
                    }
                })
            }
        })
    })
}

const tran = new db.Transaction([
    {
        type: 'INSERT',
        sql: "INSERT INTO `user` (name) VALUES (?)",
        data: ["haibaotest"],
    },
    {
        type: 'DELETE',
        sql: "INSERT INTO `user` (name) VALUES (?)",
        data: ["haibaotest"],
    },
    {
        type: 'UPDATE',
        sql: "INSERT INTO `user` (name) VALUES (?)",
        data: ["haibaotest"],
    },

]);

module.exports = {
    test,
    testo,
    test1,
    test2,
}

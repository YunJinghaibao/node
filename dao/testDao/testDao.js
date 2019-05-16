const db = require('../util');

const test1 = (query, fn) => {
    let sql = "SELECT * FROM `user` WHERE name = ?";
    let data = [query.name];
    db.inquireByQuery(sql, data, (error, results, fields) => {
        if(error){
            fn(error, null);
        }else{
            fn(null, results);
        }
    })
}

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
    console.log(query);
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
                    let data = [query.id];
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
    console.log(query);
    db.ADC(connection => {
        connection.beginTransaction(error => {
            if(error){
                fn(error, null);
            }else{
                const task1 = new Promise((resolve, reject) => {
                    let sql = "SELECT * FROM `user` WHERE name = ?";
                    let data = [query[0].name];
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
                    let sql = "SELECT * FROM `user` WHERE name = ?";
                    let data = [query[1].name];
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

module.exports = {
    test,
    testo,
    test1,
    test2,
}

const { DBO } = require('../util');
const db = new DBO();
// let sql = "SELECT * FROM `user` WHERE name = ?";
// let data = [query.name];
// let sql = "DELETE FROM `user` WHERE id = ?"
// let data = [26];
// let sql = "UPDATE `user` SET name = 'jysiyuanhaibao' WHERE id = ?;"
// let data = [28];
// let sql = "INSERT INTO `user` (name) VALUES (?)"
// let data = ["haibaotest"];
const test = (query, fn) => {
    db.simTran(connection => {
        connection.beginTransaction(error => {
            if(error){
                fn(error, null);
            }else{
                const task1 = db.doTask({
                    sql: "SELECT * FROM `user` WHERE name = ?",
                    query: [query.name],
                }, connection);
                const task2 = db.doTask({
                    // sql: "SELECT * FROM `user` WHERE id = ?",
                    // sql: "INSERT INTO `user` (name) VALUES (?)",
                    sql: "DELETE FROM `user` WHERE name = ?",
                    query: ['test456'],
                }, connection);
                db.taskQueue([task1, task2], fn, connection);
            }
        })
    })
}
module.exports = {
    test,
    // testo,
    // test1,
    // test2,
}

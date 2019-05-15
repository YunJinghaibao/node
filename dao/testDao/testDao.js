const db = require('../index');

const test = (fn) =>{
    let sql = "SELECT * from user";
    db.inquire(sql, (error, results) =>{
        if(error){
            fn(error, null)
            return;
        }
        fn(null, results);
    })
}

const test1 = (fn) => {
    const task1 = {
        sql: "SELECT * FROM `user` WHERE id = ?",
        data: [2],
    }
    const task2 = {
        sql: "SELECT * FROM `user` WHERE id = ?",
        data: [5],
    }
    // const task2 = {
    //     sql: "INSERT INTO `user` (`name`) VALUES (?)",
    //     data: ['test'],
    // }
    let tasks = [task1, task2];
    db.ADC(tasks, (error, results) => {
        if(error){
            fn(error, null)
            return;
        }
        fn(null, results);
    })
}

module.exports = {
    test,
    test1,
}

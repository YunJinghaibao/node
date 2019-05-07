const con = require('../index');

test = (fn) =>{
    let query = "SELECT * from users";
    con.query(query, (error, results, fields) => {
        if(error){
            throw new Error('数据库连接函数test错误:' + error);
        };
        fn(results);
    })
}


module.exports = {
    test,
}
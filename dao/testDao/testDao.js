const db = require('../index');

test = (fn) =>{
    let query = "SELECT * from user";
    db.inquire(query ,(error, results) =>{
        if(error){
            fn(error, null)
            return;
        }
        fn(null, results);
    })
}

test1 = ([], fn) => {
    db.ADC((connection) => {

    })
}

module.exports = {
    test,
    test1,
}

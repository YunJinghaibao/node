const NoAdaptation = (daoFunction) => {
    return (query, callback) => {
        new Promise((resolve, reject) => {
            daoFunction(query, (error, results) => {
                if(error){
                    reject(error);
                }else{
                    resolve(results);
                }
            })
        })
        .then(res => {
            callback(res, 200);
        })
        .catch(error => {
            callback(error, 400);
        })
    }
}

module.exports = {
    NoAdaptation,
}

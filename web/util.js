const controllerCreator = (service) => {
    return (req, res) => {
        switch(req.method){
            case 'GET':
            service(req.query, (results, status = null) => {
                if(status){
                    res.status(status).send(results);
                }else{
                    res.status(200).send(results);
                }
            });
            break;
            case 'POST':
            service(req.body, (results, status = null) => {
                if(status){
                    res.status(status).send(results);
                }else{
                    res.status(200).send(results);
                }
            });
            break;

            default:
            break;
        }
    }
}
module.exports = {
    controllerCreator
}

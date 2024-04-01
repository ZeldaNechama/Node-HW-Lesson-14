const config = require('../config/config');
//const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const logsDataCalls = (req, res, next) => {
    req.requestTime = Date.now();
    console.log("The data is called from the: " + req.url + "  the time the req accuerd" + Date.now() + " the method is: " + req.method);
    next();
};

const checkStatusCall = (req, res, next) => {
    if (req.method == 'POST' || req.method == 'PUT') {
        if (Object.keys(req.body).length === 0) {
            res.status(404).send("No sent data, can't finish request.");
            return;
        }
    }
    next();
};

const authMiddleware = async (req, res, next) => {

    try {
        let token = req.header('Authorization');
        if (!token) return res.status(401).send("Access Denied");

        try {
            // if (token.startsWith('Bearer ')) {
            //     token = token.slice(7, token.length).trimLeft();
            // }
            const verified = jwt.verify(token, config.SECRET_TOKEN);
            if (verified.user_type_id === 2) { // Check authorization, 2 = Customer, 1 = Admin
                let req_url = req.baseUrl + req.route.path;
                if (req_url.includes("users/:id") && parseInt(req.params.id) !== verified.id) {
                    return res.status(401).send("Unauthorized!");
                }
            }
            req.user = verified;
            next();


        } catch (error) {
            res.status(400).send("Invalid Token");

        }

    } catch (error) {
        res.status(505).send('server is facing issues' + error.message);
    }
};

const adminOnly=(req,res,next)=>{
    if( req.user.user_type_id === 2 ){
        return res.status(401).send("Access Denied");
    }  
    next();
}


module.exports = { logsDataCalls, checkStatusCall, authMiddleware,adminOnly };

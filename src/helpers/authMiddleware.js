const jwt = require("jsonwebtoken")

module.exports = {
    checkLogin : (req,res,next)=>{
        const baerer = req.header("x-access-token")
        if(baerer){
            res.status(401).send({
                msg: "cannot access",
                status: 401,
                error: "You must log in"
            })
        }else{
            const token = bearer.split(" ")[1]
            try{
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                req.decodedToken = decodedToken; 
                next();
            }
            catch(error){
                res.status(401).send({
                    msg: "cannot access",
                    status: 401,
                    error: "Invalid token",
                })
            }
            
        }
    }
}
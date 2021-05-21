const {users, Sequelize} = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op

module.exports={
    signup:(req, res) =>{
        const{body} =req;
        const saltround = 10;

        body.password = bcrypt.hashSync(body.password, saltround);

        console.log(body);

        //console.log(body)
    users.create(body)
        .then((data) =>{
            res.status(200).send({
                msg : "signup succesfull",
                status : 200,
                data,
            })
        })
        .catch((error)=> {
            res.status(500).send({
                msg : "signup failed",
                status : 500,
                error,
            })
        })
    },
    signin: async(req, res)=> {
        const {body}= req;

        let findUser = await users.findOne({
            where : {
                [Op.or] : [
                    {username : body.username}, {email: body.username},
                ]},
        })
        if (findUser===null){
            res.status(404).send({
                msg: "sign in error",
                status: 404,
                error: "user not found"

            })
        }
        // console.log("cek" + findUser);
        const isValidPassword = bcrypt.compareSync(
            body.password,
            findUser.dataValues.password
        );
        if (!isValidPassword){
            res.status(403).send({
                msg: "sign in error",
                status: 403,
                error: "password is invalid"
            })
        }
        const payload = {
            id : findUser.dataValues.id,
            username : findUser.dataValues.username,
            email : findUser.dataValues.email,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400,
        });
        delete findUser.dataValues.password;
        res.status(200).send({
            msg: "sign in success",
            status: 200,
            data: {...findUser.dataValues, token},

        })
    }
}
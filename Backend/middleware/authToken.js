import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../const/JWT_SECRET.js';

export default async function authToken(req, res, next) {
    const authorized = req.headers['authorization']
    const token = authorized && authorized.split(' ')[1]
    if (!token) {
        res.status(401).send("Esta operacion necesita un token de validacion")
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(401).send("El token no es valido")
        }
        req.user = user
        next()
    })
    
    console.log(authorized)
}


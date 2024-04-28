export default async function checkIsAdmin(req, res, next){
    if(!req.user && Boolean(!req.user.isAdmin)){
        return res.status(403).json({error:"El ususario que quería realizar esta acción no es administrador"});
    }
    next();
}
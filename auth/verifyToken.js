import  jwt from 'jsonwebtoken'

export default ( req, res, next) => {
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send('Acces denied')
    }
    try{
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next()
    }catch(error){
        res.status(400).json({message: 'logout'})
    }
}

import jwt from "jsonwebtoken"


export const isAuth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]

        console.log(token ,"token")

        if(!token) {
            return res.status(401).json({message: 'Not authorized'})
        }


        const decoded = jwt.verify(token, 'userSecret')

        console.log(decoded, "decoded")

    
    
        req.body.userId = decoded.id;

        console.log(req.body.userId, "  req.body.userId")


      
        next()
    } catch (error) {
       console.log(error)
    }
}



export const isAdmin = async (req, res, next) => {
    
       

    try {


        const user  = req.body.userId


        if(user.isAdmin === 'admin') {
            next()
        } else {
            return res.status(401).json({message: 'Not admin pro !'})
        }

    } catch (error) {

        console.log(error)
        
    }




}
         
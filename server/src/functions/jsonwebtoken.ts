import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'sampleSecret'

export function sign(id:string){
    return jwt.sign({id},secret,{
        expiresIn: '1d'
    })
}
export function verify(token:string):number|undefined{
    try{
        const object = jwt.verify(token, secret);
        if(typeof object === 'string'){
            return undefined
        } else {
            return object.id
        }
    }catch(e:any){
        console.log("e",e)
        return undefined
    }
  
}
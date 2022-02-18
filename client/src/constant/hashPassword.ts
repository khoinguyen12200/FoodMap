import hash from 'js-sha512'

function hashPassword(pass:string){
    return hash.sha512(pass)
}

export default hashPassword;
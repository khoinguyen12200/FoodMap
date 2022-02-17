import hash from 'js-sha512'

function hashPassword(pass:string){
    hash.sha512(pass)
}

export default hashPassword;
const connector = require('../connector')
const bcrypt = require( 'bcrypt-nodejs' )

const findById = ( id ) => {
    return connector.execQuery( 'get_user_by_id', [ id ] )
}

const createUser = ( email, password ) => {
    return connector.execQuery( 'create_user', [ email, password ] )
}

const generateHash = ( password ) => {
    return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null )
}

const verifyPassword = ( password, userPassword ) => {
    return password && userPassword ? bcrypt.compareSync( password, userPassword ) : false
}

// Take a user query result and transform it to JSON with secure fields removed
const safeUser = ( user ) => {
    const trueUser = user[0][0]

    return {
        id: trueUser.id,
        email: trueUser.email,
    }
}

module.exports = {
    findById,
    createUser,
    generateHash,
    verifyPassword,
    safeUser
}

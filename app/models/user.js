const connector = require('../connector')
const bcrypt = require( 'bcrypt-nodejs' )

const findById = ( id ) => {
    return connector.execQuery( 'get_user_by_id', [ id ] )
}

const findByEmail = ( email ) => {
    return connector.execQuery( 'get_user_by_email', [ email ] )
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

// Take a user and transform it to JSON with secure fields removed
const safeUser = ( user ) => {
    return {
        id: user.id,
        email: user.email,
    }
}

module.exports = {
    findById,
    findByEmail,
    createUser,
    generateHash,
    verifyPassword,
    safeUser
}

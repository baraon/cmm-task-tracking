const connector = require('../connector')

const findById = ( id ) => {
    return connector.execQuery( 'get_user_by_id.sql', [ id ] )
}

module.exports = {
    findById
}

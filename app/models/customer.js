const connector = require('../connector')

const getCustomers = () => {
    return connector.execQuery( 'get_customers' )
}

const findById = ( id ) => {
    return connector.execQuery( 'get_customer_by_id', [ id ] )
}

const createCustomer = ( name ) => {
    return connector.execQuery( 'create_customer', [ name ] )
}

const editCustomer = ( id, name ) => {
    return connector.execQuery( 'edit_customer', [ name, id ] )
}

const deleteCustomer = ( id ) => {
    return connector.execQuery( 'delete_customer', [ id ] )
}

module.exports = {
    getCustomers,
    createCustomer,
    findById,
    editCustomer,
    deleteCustomer
}

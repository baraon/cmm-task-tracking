const connector = require('../connector')

const getProjects = () => {
    return connector.execQuery( 'get_projects' )
}

const findById = ( id ) => {
    return connector.execQuery( 'get_project_by_id', [ id ] )
}

const createProject = ( name, customerId ) => {
    return connector.execQuery( 'create_project', [ name, customerId ] )
}

const editProject = ( id, name ) => {
    return connector.execQuery( 'edit_customer', [ name, id ] )
}

module.exports = {
    getProjects,
    createProject,
    findById,
    editProject
}

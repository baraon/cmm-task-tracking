const connector = require('../connector')

const getProjects = () => {
    return connector.execQuery( 'get_projects' )
}

const findById = ( id ) => {
    return connector.execQuery( 'get_project_by_id', [ id ] )
}

const findByCustomerId = ( customerId ) => {
    return connector.execQuery( 'get_projects_by_customer_id', [ customerId ] )
}

const createProject = ( name, customerId ) => {
    return connector.execQuery( 'create_project', [ name, customerId ] )
}

const editProject = ( id, name ) => {
    return connector.execQuery( 'edit_project', [ name, id ] )
}

const deleteProject = ( id ) => {
    return connector.execQuery( 'delete_project', [ id ] )
}

module.exports = {
    getProjects,
    createProject,
    findById,
    editProject,
    findByCustomerId,
    deleteProject
}

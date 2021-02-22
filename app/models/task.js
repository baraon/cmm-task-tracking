const connector = require('../connector')

const getTasks = () => {
    return connector.execQuery( 'get_tasks' )
}

const findById = ( id ) => {
    return connector.execQuery( 'get_task_by_id', [ id ] )
}

const createTask = ( description, projectId ) => {
    return connector.execQuery( 'create_task', [ name, projectId ] )
}

const editTask = ( id, description ) => {
    return connector.execQuery( 'edit_customer', [ description, id ] )
}

module.exports = {
    getTasks,
    createTask,
    findById,
    editTask
}

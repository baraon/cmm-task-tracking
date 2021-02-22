const connector = require('../connector')

const getTasks = () => {
    return connector.execQuery( 'get_tasks' )
}

const findById = ( id ) => {
    return connector.execQuery( 'get_task_by_id', [ id ] )
}

const findByProjectIds = ( id ) => {
    return connector.execQuery( 'get_tasks_by_project_ids', [ id ] )
}

const createTask = ( description, projectId ) => {
    return connector.execQuery( 'create_task', [ description, projectId ] )
}

const editTask = ( id, description ) => {
    return connector.execQuery( 'edit_task', [ description, id ] )
}

const deleteTask = ( id ) => {
    return connector.execQuery( 'delete_task', [ id ] )
}

module.exports = {
    getTasks,
    createTask,
    findById,
    findByProjectIds,
    editTask,
    deleteTask
}

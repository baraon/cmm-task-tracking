const connector = require('../connector')

const getTaskLogs = () => {
    return connector.execQuery( 'get_tasks_and_task_logs' )
}

const findById = ( id ) => {
    return connector.execQuery( 'get_task_log_by_id', [ id ] )
}

const createTaskLog = ( taskId, userId ) => {
    return connector.execQuery( 'create_task_log', [ taskId, userId ] )
}

const editTaskLog = ( id ) => {
    return connector.execQuery( 'edit_task_log', [ id ] )
}

const deleteTaskLog = ( id ) => {
    return connector.execQuery( 'delete_task_log', [ id ] )
}

module.exports = {
    getTaskLogs,
    createTaskLog,
    deleteTaskLog,
    editTaskLog,
    findById
}

const connector = require('../connector')

const getTaskLogs = () => {
    return connector.execQuery( 'get_tasks_and_task_logs' )
}

const findById = ( id ) => {
    return connector.execQuery( 'get_task_log_by_id', [ id ] )
}

const createTaskLog = ( duration, taskId, userId ) => {
    return connector.execQuery( 'create_task_log', [ duration, taskId, userId ] )
}

const editTaskLog = ( duration, id ) => {
    return connector.execQuery( 'edit_task_log', [ duration, id ] )
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

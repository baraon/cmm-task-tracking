const models = require( '../models/' )

let external = {}

const transformer = ( taskLog ) => {
    return {
        id: taskLog.id,
        duration_minutes: taskLog.duration_minutes,
        user: {
            id: taskLog.user_id,
            email: taskLog.user_email
        }
    }
}

external.create = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.taskId || !req.body || !req.body.duration )
        return res.sendStatus( 422 )

    return models.TaskLog.createTaskLog( req.body.duration, req.params.taskId, req.user.id ).then( async results => {
        if ( !results || !results.length )
            return res.sendStatus( 500 )

        // Retrieve newly created task log
        const taskLog = await models.TaskLog.findById( results[ 0 ].insertId ).then( taskLog => taskLog[0][0] )
        if ( !taskLog )
            return res.sendStatus( 500 )

        return res.json({ task: transformer( taskLog ) })
    })
}

external.read = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    return models.TaskLog.getTaskLogs().then( async results => {
        // represents query that's transformed
        let transformed = []

        results[0].forEach( log => {
            let index = transformed.findIndex( l => l.id === log.task_id )
            // index returns -1 if it fails to find
            if ( index < 0 ) {
                let tempTask = {
                    id: log.task_id,
                    description: log.task_description,
                    project: {
                        id: log.project_id,
                        name: log.project_name
                    }
                }

                // filters out logs from other users
                // i would try to solve this if it werent for WITH AS not working for me as intended :(
                if ( log.user_id === req.user.id )
                    tempTask.taskLogs = [ transformer( log ) ]
                else
                    tempTask.taskLogs = []

                transformed.push( tempTask )
            }
            else {
                if ( log.user_id === req.user.id )
                    transformed[ index ].taskLogs.push( transformer( log ) )
            }

        })

        return res.json({ tasks: transformed })
    })
}

external.update = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.id || !req.body || !req.body.duration )
        return res.sendStatus( 422 )

    return models.TaskLog.editTaskLog( req.body.duration, req.params.id ).then( async results => {
        // get updated task log
        const taskLog = await models.TaskLog.findById( req.params.id ).then( taskLog => taskLog[0][0] )
        if ( !taskLog )
            return res.sendStatus( 500 )

        return res.json({ task: transformer( taskLog ) })
    })
}

external.delete = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.id )
        return res.sendStatus( 422 )

    console.log( req.params.id )
    return models.TaskLog.deleteTaskLog( req.params.id ).then( result => {
        return res.json({ id: req.params.id })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

module.exports = external

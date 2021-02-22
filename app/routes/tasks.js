const models = require( '../models/' )

let external = {}

external.create = async ( req, res ) => {
    console.log( 'task create heard' )
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.projectId || !req.body || !req.body.description )
        return res.sendStatus( 422 )

    return models.Task.createTask( req.body.description, req.params.projectId ).then( async results => {
        if ( !results || !results.length )
            return res.sendStatus( 500 )

        // Retrieve newly created task
        const task = await models.Task.findById( results[ 0 ].insertId )
        if ( !task )
            return res.sendStatus( 500 )

        return res.json({ task: task[0][0] })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

external.read = async ( req, res ) => {
    console.log( 'task read heard' )
}

external.update = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.id || !req.body || !req.body.description )
        return res.sendStatus( 422 )

    return models.Task.editTask( req.params.id, req.body.description ).then( async results => {
        // get updated task
        let task = await models.Task.findById( req.params.id ).then( task => task[0][0] )

        return res.json({ task })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

external.delete = async ( req, res ) => {
    console.log( 'task delete heard' )
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.id )
        return res.sendStatus( 422 )

    return models.Task.deleteTask( req.params.id ).then( result => {
        return res.json({ id: req.params.id })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

module.exports = external

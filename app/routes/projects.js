const models = require( '../models/' )

let external = {}

external.create = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.customerId || !req.body || !req.body.name )
        return res.sendStatus( 422 )

    return models.Project.createProject( req.body.name, req.params.customerId ).then( async results => {
        if ( !results || !results.length )
            return res.sendStatus( 500 )

        // Retrieve newly created project
        const project = await models.Project.findById( results[ 0 ].insertId )
        if ( !project )
            return res.sendStatus( 500 )

        return res.json({ project: project[0][0] })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })

}

external.read = async ( req, res ) => {
    console.log( 'project  read heard' )
}

external.update = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.id || !req.body || !req.body.name )
        return res.sendStatus( 422 )

    return models.Project.editProject( req.params.id, req.body.name ).then( async results => {
        // get updated project
        let project = await models.Project.findById( req.params.id ).then( project => project[0][0] )
        // get all tasks associated with project
        const tasks = await models.Task.findByProjectIds( [ project.id ] ).then( tasks => tasks[0] )

        project.tasks = tasks

        return res.json({ project })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

external.delete = async ( req, res ) => {
    console.log( 'project delete heard' )
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.id )
        return res.sendStatus( 422 )

    return models.Project.deleteProject( req.params.id ).then( result => {
        return res.json({ id: req.params.id })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

module.exports = external

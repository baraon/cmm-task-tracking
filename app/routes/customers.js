const models = require( '../models/' )

let external = {}

external.create = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.body || !req.body.name )
        return res.sendStatus( 422 )

    return models.Customer.createCustomer( req.body.name ).then( async results => {
        if ( !results || !results.length )
            return res.sendStatus( 500 )

        // Retrieve newly created customer
        const customer = await models.Customer.findById( results[ 0 ].insertId )
        if ( !customer )
            return res.sendStatus( 500 )

        return res.json({ customer: customer[0][0] })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

external.read = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus(401)
    // if req query all, return EVERYTHING about the customers
    // then get every project
    // then get every task
    // put them in a promise
    // then properly organize the json that will be sent out
    let query
    let flag = 'single' // default for one read
    if ( req.query.all ) {
        query = Promise.all([
            models.Customer.getCustomers().then( result => { return { customers: result[0] } } ),
            models.Project.getProjects().then( result => { return { projects: result[0] } } ),
            models.Task.getTasks().then( result => { return { tasks: result[0] } } )
        ])

        flag = 'multiple'
    }

    return query.then( results => {
        if ( !results || !results.length )
            res.sendStatus(500)

        if ( flag === 'multiple' ) {
            let tempCustomers
            let tempProjects
            let tempTasks
            results.forEach( result => {
                if ( result.customers )
                    tempCustomers = result.customers.map( customer => Object.assign( {}, customer ))

                if ( result.projects )
                    tempProjects = result.projects

                if ( result.tasks )
                    tempTasks = result.tasks
            })

            tempProjects.forEach( project => {
                project.tasks = []
                tempTasks.forEach( task => {
                    if ( task.project_id === project.id )
                        project.tasks.push( Object.assign({}, task ) )
                })
            })

            tempCustomers.forEach( customer => {
                customer.projects = []
                tempProjects.forEach( project => {
                    if ( project.customer_id === customer.id )
                        customer.projects.push( Object.assign( {}, project ) )
                })
            })

            return res.json( { customers: tempCustomers } )
        }
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

external.update = async ( req, res ) => {
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.id || !req.body || !req.body.name )
        return res.sendStatus( 422 )

    return models.Customer.editCustomer( req.params.id, req.body.name ).then( async results => {
        // get newly created customer
        let customer = await models.Customer.findById( req.params.id ).then( customer => customer[0][0] )
        // get all projects associated with customer
        let projects = await models.Project.findByCustomerId( customer.id ).then( projects => projects[0] )
        // get all tasks associated with projects
        const projectIds = projects.map( project => project.id )
        const tasks = await models.Task.findByProjectIds( projectIds ).then( tasks => tasks[0] )

        customer.projects = projects.map( project => {
            project.tasks = []
            tasks.forEach( task => {
                if ( task.project_id === project.id )
                    project.tasks.push( Object.assign({}, task ) )
            })
            return project
        })
        return res.json({ customer })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

external.delete = async ( req, res ) => {
    console.log( 'customer delete heard' )
    if ( !req.user )
        return res.sendStatus( 401 )

    if ( !req.params || !req.params.id )
        return res.sendStatus( 422 )

    return models.Customer.deleteCustomer( req.params.id ).then( result => {
        return res.json({ id: req.params.id })
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

module.exports = external

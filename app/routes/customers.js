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

        console.log( results )
        // Retrieve newly created customer
        const customer = await models.Customer.findById( results[ 0 ].insertId )
        console.log( customer[0][0] )
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

    console.log( req.query )

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

    return models.Customer.editCustomer( req.params.id, req.body.name ).then( results => {
        console.log( results )

        return res.sendStatus( 200 )
    }).catch( err => {
        console.error( err )
        return res.sendStatus( 500 )
    })
}

external.delete = async ( req, res ) => {
    // must delete every task associated with every project associated with the customer
    console.log( 'customer delete heard' )
}

module.exports = external

const mysql = require('mysql2/promise')
const knex = require('knex')
const config = require('./config/')
const utils = require('./utils')
const integrator = require('./integrator')

let internal = { _connection: null, _established: false }

internal.establish = _ => {
    if ( internal._established )
        return console.warn( 'Connector is already established' )

    let dbNames = [ config.sqlOptions.database ]

    let createConnection = async dbName => {
        let connection = await mysql.createConnection({
            host: config.sqlOptions.host,
            port: config.sqlOptions.port,
            user: config.sqlOptions.user,
            password: config.sqlOptions.password,
            database: dbName
        })

        //console.log(connection)

        return {
            _: connection,
            name: dbName
        }
    }

    return new Promise(( resolve, reject ) => {
        let promises = []

        console.log( 'Connecting Native Driver', dbNames )

        for ( let name of dbNames )
            promises.push( createConnection( name ) )

        return utils.unify( promises ).then( connections => { // map the connections to their config name for use in code
            let connectionsMap = {}

            connections.forEach( c => connectionsMap[ c.name ] = c._ )

            internal._established = true

            return resolve( internal._connection = connectionsMap )
        }).catch( err => {
            return reject( err )
        })
    })
}

// Grab a specific database off the connected server
internal.grab = ( dbName = config.sqlOptions.database ) => {
    if( !internal._connection )
        throw 'Have not established database connection'

    //console.debug('grabbing', qualifiedName)
    return internal._connection[ dbName ]
}

internal.execQuery = ( instruction, params = [] ) => {
    console.log( instruction, params )
    return internal.grab().query( integrator.load( instruction ), params )
}

module.exports = internal

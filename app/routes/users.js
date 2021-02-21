const models = require( '../models/' )

let external = {}

external.create = async ( req, res ) => {
    if ( !req || !req.body ) {
        console.error( 'Missing request body.' )
        return res.sendStatus(422)
    }

    if ( !req.body.email || !req.body.password ) {
        console.error( 'Missing required fields' )
        return res.sendStatus(422)
    }

    const hashedPassword = models.User.generateHash( req.body.password )
    const email = req.body.email

    return await models.User.createUser( email, hashedPassword ).then( async result => {
        // Retrieve newly created user
        const user = await models.User.findById( result[ 0 ].insertId )
        if ( !user )
            throw 'Newly created user not found'

        res.json({ user: models.User.safeUser( user ) })
    }).catch( err => {
        console.error( err )
        res.sendStatus(500)
    })
}

module.exports = external

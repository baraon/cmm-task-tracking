const models = require( '../models/' )

let external = {}

external.create = async ( req, res ) => {
    console.log( 'project create heard' )
}

external.read = async ( req, res ) => {
    console.log( 'project  read heard' )
}

external.update = async ( req, res ) => {
    console.log( 'project  update heard' )
}

external.delete = async ( req, res ) => {
    console.log( 'project  delete heard' )
}

module.exports = external

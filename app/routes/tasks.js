const models = require( '../models/' )

let external = {}

external.create = async ( req, res ) => {
    console.log( 'task create heard' )
}

external.read = async ( req, res ) => {
    console.log( 'task read heard' )
}

external.update = async ( req, res ) => {
    console.log( 'task update heard' )
}

external.delete = async ( req, res ) => {
    console.log( 'task delete heard' )
}

module.exports = external

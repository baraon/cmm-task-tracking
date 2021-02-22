const models = require( '../models/' )

let external = {}

external.create = async ( req, res ) => {
    console.log( 'task log create heard' )
}

external.read = async ( req, res ) => {
    console.log( 'task log read heard' )
}

external.update = async ( req, res ) => {
    console.log( 'task log update heard' )
}

external.delete = async ( req, res ) => {
    console.log( 'task log delete heard' )
}

module.exports = external

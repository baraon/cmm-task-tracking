const fs = require('fs')
const path = require('path')

let methods = {}
let instructions = {}

methods.load = descriptor => {
    if ( instructions[ descriptor ] )
        return instructions[ descriptor ]

    let fullPath = path.join( __dirname, `instructions/${descriptor}.sql` )
    if(!fs.existsSync(fullPath))
        throw 'SQL instruction ' + descriptor + ' does not exist'

    let content = fs.readFileSync( fullPath, 'utf8' ).trim()
    return ( instructions[ descriptor ] = content )
}

module.exports = methods

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const sanitized = require('express-sanitized')
const favicon = require('serve-favicon')
const path = require('path')
const passport = require('passport')
const connector = require('./app/connector')
const config = require('./app/config')

/*
 * MySQL Set Up
*/

const doInitialization = () => {
  app.use( ( req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use( favicon( path.join(__dirname, 'src', 'favicon.ico') ))

  const sessionCookie = {
    expires: new Date('Fri, 31 Dec 9999 11:59:59 GMT'),
    path: '/'
  }

  app.use( bodyParser.json( {type: 'application/vnd.api+json'} )) // parse application/vnd.api+json as json
  app.use( bodyParser.urlencoded( {limit: '50mb', extended: true} )) // parse application/x-www-form-urlencoded

  app.use( passport.initialize() )
  app.use( passport.session() )

  /*
  * Initialize defaults
  */

  /*
  const models = require('./app/models/')
  if ( process.argv.length > 2 && process.argv[2].toLowerCase() === 'init' )
    models.initializeDefaults()
  models.services = await models.loadServices()
   */
  app.use( '/', express.static( path.join( __dirname, 'dist' ) ))
  app.routes = require('./app/routes/')( app )

  app.use( '/*', express.static( path.join( __dirname, 'dist' ) ))

  /*
   * Load security modules
   */

  app.use( helmet() )
  app.use( sanitized() )

  app.listen( config.port, () => {
    console.log( 'Server running. http://localhost:' + config.port )
  })
}

return connector.establish().then( connection => {
  return doInitialization()
}).catch(err => {
  console.error('system error', err)

  process.exit(1)
})

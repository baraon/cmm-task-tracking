const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const sanitized = require('express-sanitized')
const favicon = require('serve-favicon')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const connector = require('./app/connector')
const config = require('./app/config')

const MySQLStore = require('express-mysql-session')(session)

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

  let sessionCookie = {
    expires: new Date('Fri, 31 Dec 2030 11:59:59 GMT'),
    path: '/'
  }

  if (config.environment === 'production')
    app.set('trust proxy', 1)

  let sessionMiddleware = session({
    name: config.session.name,
    secret: config.session.secret,
    cookie: sessionCookie,
    store: new MySQLStore({}, connector.grab()),
    resave: true,
    saveUninitialized: false,
    unset: 'destroy'
  })
  app.use(sessionMiddleware)

  app.use(bodyParser.json()) // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // parse application/vnd.api+json as json
  app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded

  app.use( passport.initialize() )
  app.use( passport.session() )

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

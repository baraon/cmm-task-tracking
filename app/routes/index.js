const express = require( 'express' )

module.exports = app => {
  let routes = {}

  // authentication helper

  // Route functions
  const auth = require( './auth' )
  const users = require( './users' )

  // Authentication endpoints
  let authRouter = express.Router()
  authRouter.post( '/login', auth.login )

  // API endpoints
  let apiRouter = express.Router()

  // Unauthenticated routes
  apiRouter.get( '/me', auth.getMe )

  // User Routes
  apiRouter.post( '/users', users.create )

  app.use ( '/auth', authRouter )
  app.use( '/api', apiRouter )

  const unhandled = route => {
    return ( req, res ) => {
      console.log( 'Unhandled route(*): ' + req.method + ' /' + route + req.url, req.body )
      res.status( 404 ).json( { error: 'unhandled route' } )
    }
  }

  authRouter.all( '*', unhandled( 'auth'  ))
  apiRouter.all( '*', unhandled( 'api' ) )
}

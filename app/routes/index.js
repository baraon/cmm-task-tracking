const express = require( 'express' )

module.exports = app => {
  let routes = {}

  // authentication helper

  // Route functions
  const auth = require( './auth' )
  const users = require( './users' )

  // API endpoints
  let apiRouter = express.Router()

  // User Routes
  apiRouter.post( '/users', users.create )

  //apiRouter.get( '/me', auth.getMe )
  app.use( '/api', apiRouter )

  const unhandled = route => {
    return ( req, res ) => {
      console.log( 'Unhandled route(*): ' + req.method + ' /' + route + req.url, req.body )
      res.status( 404 ).json( { error: 'unhandled route' } )
    }
  }
  apiRouter.all( '*', unhandled( 'api' ) )
}

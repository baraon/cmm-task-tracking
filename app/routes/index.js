const express = require( 'express' )

module.exports = app => {
  let routes = {}

  // authentication helper

  // API endpoints
  let apiRouter = express.Router()

  // unauthenticated routes

  apiRouter.get( '/cat', (req, res) => {
    res.send( 'api works uwu' )
  })
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

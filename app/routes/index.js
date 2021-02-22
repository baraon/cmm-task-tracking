const express = require( 'express' )

module.exports = app => {
  let routes = {}

  // authentication helper

  // Route functions
  const auth = require( './auth' )
  const users = require( './users' )
  const customers = require( './customers' )
  const projects = require( './projects' )
  const tasks = require( './tasks' )
  const taskLogs = require( './taskLogs' )

  // Authentication endpoints
  let authRouter = express.Router()
  authRouter.post( '/login', auth.login )
  authRouter.get( '/logout', auth.logout )

  // API endpoints
  let apiRouter = express.Router()

  // Unauthenticated routes
  apiRouter.get( '/me', auth.getMe )

  // User Routes
  apiRouter.post( '/users', users.create )

  // Customer Routes
  apiRouter.get( '/customers', customers.read )
  apiRouter.post( '/customers', customers.create )
  apiRouter.patch( '/customers/:id', customers.update )
  apiRouter.delete( '/customers/:id', customers.delete )

  // Project Routes
  apiRouter.post( '/customers/:customerId/projects', projects.create )
  apiRouter.patch( '/projects/:id', projects.update )
  apiRouter.delete( '/projects/:id', projects.delete )

  // Task Routes
  apiRouter.post( '/projects/:projectId/tasks', tasks.create )
  apiRouter.patch( '/tasks/:id', tasks.update )
  apiRouter.delete( '/tasks/:id', tasks.delete )

  // Task Log Routes
  apiRouter.get( '/tasks', taskLogs.create )
  apiRouter.delete( '/tasks/:id', taskLogs.delete )

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

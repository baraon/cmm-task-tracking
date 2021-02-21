const passport = require( 'passport' )
const LocalStrategy = require( 'passport-local' ).Strategy
const models = require( '../models/' )
const config = require( '../config' )

let external = {}

passport.serializeUser(( user, done ) => {
  done( null, user ? user.id : null )
})

passport.deserializeUser(( id, done ) => {
  if(id) {
    return models.User.findById( id ).then( user => {
      done( null, models.User.safeUser( user[0][0] ) )
    }).catch(err => {
      console.error( 'deserialize error', err )
      done( err )
    })
  } else
    done( null, null )
})

passport.use( new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true,
  passReqToCallback: true
}, ( req, email, password, cb ) => {
  models.User.findByEmail( email.toLowerCase() ).then( user => {
    if ( !user || !user.length || !user[0].length )
      return cb( null, false, { message: 'User does not exist.' } )

    if ( !models.User.verifyPassword( password, user[0][0].password ) )
      return cb( null, false, { message: 'Email or password is incorrect.' })

    const formattedUser = {
      id: user[0][0].id,
      email: user[0][0].email,
      password: user[0][0].password
    }

    return cb( null, formattedUser, { message: 'Logged in successfully' })
  }).catch( err => cb( err ))
}))

external.login = ( req, res, next ) => {
  passport.authenticate( 'local', { session: false }, ( err, user, info ) => {
    if ( err )
      return next( err )

    if ( !user )
      return res.status( 200 ).json( info )

    req.login( models.User.safeUser(user), error=> {
      if ( error )
        return next( error )

      return external.getMe( req, res )
    })

  })( req, res, next )
}

external.getMe = ( req, res ) => {
  console.log( 'get me req user', req.user )
  res.json({
    user: req.user ? req.user : null
  })
}

module.exports = external

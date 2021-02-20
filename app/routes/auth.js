const passport = require( 'passport' )
const models = require( '../models/' )

let methods = module.exports = {}

passport.serializeUser(function(user, done) {
  done(null, user ? user.id : null)
})

passport.deserializeUser(function(id, done) {
  if(id) {
    return models.User.findOne({ id }).then(user => {
      done(null, user)
    }).catch(err => {
      console.error('deserialize error', err)
      done(err)
    })
  } else
    done(null, null)
})

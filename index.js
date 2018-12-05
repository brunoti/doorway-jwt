const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const passport = require('koa-passport')
const Router = require('koa-router')
const compose = require('koa-compose')

const { login, renew } = require('./routes')

const doesItHaveTheKey = (options = {}) => {
  return passport.authenticate('jwt', {
    session: false,
    ...options,
  })
}

const middleware = (options = {}) => {
  const router = new Router()
  const strategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: options.secret,
  }, (payload, done) => {
    options.model.findById(payload.user)
      .then(user => user ? done(null, user) : done(null, false))
      .catch(err => done(err, false))
  })

  passport.use(strategy)

  if(options.routerPrefix) {
    router.prefix(options.routerPrefix)
  }

  router.post('/auth/token', login(options))
  router.post('/auth/renew', doesItHaveTheKey(), renew(options))

  return compose([router.routes(), router.allowedMethods()])
}

module.exports = {
  middleware,
  doesItHaveTheKey,
}

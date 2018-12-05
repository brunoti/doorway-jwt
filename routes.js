const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = (options) => async (ctx) => {
  const { email, password } = ctx.request.body
  const user = await options.model.findOne({ email })
  if (!user) {
    ctx.status = 401
    ctx.body = { message: 'Email or Password are incorrect' }
    return ctx
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    ctx.status = 401
    ctx.body = { message: 'Email or Password are incorrect' }
    return ctx
  }

  ctx.status = 200
  ctx.body = {
    result: {
      token: jwt.sign({
        user: user._id,
      }, options.secret, {
        expiresIn: options.tokenExpiresIn || '3h',
      }),
      user,
    },
  }

  return ctx
}

const renew = (options) => async (ctx) => {
  const { user } = ctx.state
  ctx.status = 200
  ctx.body = {
    result: {
      token: jwt.sign({
        user: user._id,
      }, options.secret, {
        expiresIn: options.tokenExpiresIn || '3h',
      }),
      user,
    },
  }
}

module.exports = {
  login,
  renew,
}

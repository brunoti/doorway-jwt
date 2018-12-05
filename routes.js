import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = (options) => async (ctx) => {
  const { email, password } = ctx.request.body
  const user = await options.model.findOne({ email })
  if (!user) {
    return ctx.unauthorized({
      message: 'Email or Password are incorrect',
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    return ctx.unauthorized({
      message: 'Email or Password are incorrect',
    })
  }

  ctx.ok({
    result: {
      token: jwt.sign({
        user: user._id,
      }, options.secret, {
        expiresIn: options.tokenExpiresIn || '3h',
      }),
      user,
    },
  })
}

export const renew = (options) => async (ctx) => {
  const { user } = ctx.state
  await ctx.ok({
    result: {
      token: jwt.sign({
        user: user._id,
      }, options.secret, {
        expiresIn: options.tokenExpiresIn || '3h',
      }),
      user,
    },
  })
}

# Doorway - JWT Keyhole

Doorway is a bunch of packages that I'm creating with reusable auth strategies for [Koa.js](https://koajs.com/).

#### Usage

```js
const Koa = require('koa')
const DoorwayJwt = require('dooway-jwt')
const app = new Koa()
app.use(DoorwayJwt.middleware({
    model: User // your mongoose User schema
    secret: 'secret' // your JWT secret
    routerPrefix: '/my-prefix' // your router prefix
    tokenExpiresIn: '3h' // the time that the token expires
}))
```

Then you will be able to found the user ``ctx.state.user`` as ``koa-passport`` do. And then the following routes will be available:

```
To receive the user and the token send a POST request with email and password to:
POST /auth/token

To renew your token by sending an empty POST request with the bearer JWT token to:
POST /auth/renew
```

If you use the ``routerPrefix`` option

```
POST /prefix/auth/token
POST /prefix/auth/renew
```

# Final Act

This is it. For now.

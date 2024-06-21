// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { loginValidator } from '#validators/login_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async login(ctx: HttpContext) {
    const { auth, request, response } = ctx
    console.log('LoginController.login', ctx.request.accepts(['json', 'vnd.api+json']))

    const { email, password } = await loginValidator.validate(request.all())

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.noContent()
  }
}

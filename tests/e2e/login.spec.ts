import { test } from '@japa/runner'

test('returns json api error when email invalid', async ({ assert, client }) => {
  const response = await client
    .post('/login')
    .json({
      email: 'corentin@thomas',
      password: 'P@ssw0rd!?',
    })
    .header('Accept', 'application/vnd.api+json')
    .send()

  response.assertBodyContains({
    errors: [
      {
        title: 'The email field must be a valid email address',
        code: 'email',
        source: { pointer: 'email' },
      },
    ],
  })
})

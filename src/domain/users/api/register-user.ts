import { type NewUserForm } from '~/domain/users/user'

export async function registerUser(form: NewUserForm) {
  const config = useRuntimeConfig()
  const apiHost = String(config.public.API_HOST)

  await $fetch(apiHost + '/user', {
    method: 'POST',
    body: JSON.stringify({
      ...form,
      companyId: '01HJPQH089B5JWC34GQVGTF5PC',
    }),
  })
}

import { type EditUserForm } from '~/domain/users/user'

export async function updateUser(userId: string, form: EditUserForm) {
  const config = useRuntimeConfig()
  const apiHost = String(config.public.API_HOST)

  await $fetch(apiHost + `/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...form,
    }),
  })
}

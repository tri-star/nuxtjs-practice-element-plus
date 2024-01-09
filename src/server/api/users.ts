import { type UserListResponse } from '~/domain/users/user'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const result = await $fetch<UserListResponse>(`${config.API_HOST}/users`)

  return result
})

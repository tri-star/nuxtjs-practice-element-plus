import type { UserDetail } from '../user'

export function fetchUser(userId: string) {
  const config = useRuntimeConfig()
  const apiHost = String(config.public.API_HOST)

  return useFetch<{ data: UserDetail }>(apiHost + `/users/${userId}`)
}

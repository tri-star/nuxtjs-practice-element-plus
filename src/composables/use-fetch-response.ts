import type { FetchError } from 'ofetch'

export function useFetchResponse<T = unknown, U = unknown>(data: Ref<T | null>, error: Ref<FetchError<U> | null>) {
  const isNotFound = computed(() => {
    if (error.value === null) {
      return false
    }
    return error.value.statusCode === 404
  })

  const isError = computed(() => {
    return error.value !== null
  })

  return {
    isError,
    isNotFound,
  }
}

import type { CompanyList } from '../company'

export function fetchCompanyList() {
  const config = useRuntimeConfig()
  const apiHost = String(config.public.API_HOST)

  return useFetch<CompanyList>(apiHost + '/companies')
}

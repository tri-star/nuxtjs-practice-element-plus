import { type ValidationError } from '@tanstack/vue-form'

export function retrieveChangeEventValue(e: unknown) {
  return ((e as Event).target as HTMLInputElement | null)?.value ?? ''
}

export function toErrorString(errors: ValidationError[] | undefined) {
  if (errors == null) {
    return ''
  }
  return errors.join('<br/>')
}

import dayjs from 'dayjs'

export function formatDate(
  date: Date | undefined | null,
  options: { format?: string; fallback?: string } = {},
): string {
  const mergedOptions = {
    format: 'YYYY-MM-DD HH:mm:ss',
    fallback: '-',
    ...options,
  }

  if (date == null) {
    return mergedOptions.fallback
  }

  const formattedDate = dayjs(date).format(mergedOptions.format)
  return formattedDate
}

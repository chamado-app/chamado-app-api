export const camelToSnakeCase = (string: string): string => {
  return string.replace(/([A-Z])/g, '_$1').toLowerCase()
}

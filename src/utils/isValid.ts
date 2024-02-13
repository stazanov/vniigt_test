interface IsValidType {
  header: string,
  value: string | undefined
}

export const isValid = ({header, value}: IsValidType): boolean => {
  if (value && value.length > 1 && (Number(value[0]) === 0) && !!Number(value[1])) return false
  if (header === "speed" && Number.isInteger(Number(value))) return true
  if (header === "force" && Number(value) > 0) return true
  if (header === "engineAmperage" && Number.isInteger(Number(value)) && Number(value) > 0) return true
  return false
}
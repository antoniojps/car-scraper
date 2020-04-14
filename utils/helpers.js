export const convertStringToNumber = (str) => {
  const trimmed = str.trim()
  const removedLineBreaks = trimmed.replace(/\r?\n|\r/g, '')
  const removedSpaces = removedLineBreaks.replace(/\s+|\.+|-+|€+/g, '')
  const number = Number(removedSpaces)
  return number
}

export const removeLineBreaks = (str) => {
  const trimmed = str.trim()
  const removedLineBreaks = trimmed.replace(/\r?\n|\r/g, '')
  return removedLineBreaks
}
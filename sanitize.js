export const sanitizeName = (value) => {
  return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export const sanitizeText = (value) => {
  return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
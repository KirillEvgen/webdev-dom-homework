export const sanitize = (str) =>
  str.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
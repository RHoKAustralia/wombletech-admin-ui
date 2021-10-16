export const okResponseJsonElse = (defaultReturn = {}) => response =>
  response.ok ? response.json() : defaultReturn
export const okResponseJson = okResponseJsonElse()
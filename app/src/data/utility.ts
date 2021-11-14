export const okResponseJsonElse = (defaultReturn = {}) => (response: any) =>
  response.ok ? response.json() : defaultReturn
export const okResponseJson = okResponseJsonElse()

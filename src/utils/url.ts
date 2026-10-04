export type URLParams = Record<string, string>

/** 获取当前页面 URL 中的查询参数，例如：?toMyGirl=%E5%B0%8F%E7%8E%8B */
export function getURLParams(): URLParams {
  if (typeof window === 'undefined') return {}

  return Object.fromEntries(new URLSearchParams(window.location.search).entries())
}

/** 将名字编码为可安全放入 URL 参数的字符串。 */
export function encodeName(name: string): string {
  return encodeURIComponent(name)
}

/** 解码 URL 中的名字；异常编码会原样返回，避免页面报错。 */
export function decodeName(encodedName: string): string {
  try {
    return decodeURIComponent(encodedName)
  } catch {
    return encodedName
  }
}

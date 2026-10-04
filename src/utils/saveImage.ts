import { toPng } from 'html-to-image'

interface SaveElementAsImageOptions {
  fileName?: string
  pixelRatio?: number
}

export async function createElementImage(element: HTMLElement, options: SaveElementAsImageOptions = {}) {
  return toPng(element, {
    cacheBust: true,
    pixelRatio: options.pixelRatio ?? Math.min(window.devicePixelRatio || 2, 3),
    backgroundColor: '#ffffff',
  })
}

export function downloadImage(dataUrl: string, fileName = 'date-invitation.png') {
  const link = document.createElement('a')
  link.download = fileName
  link.href = dataUrl
  link.click()
}

export async function saveElementAsImage(element: HTMLElement, options: SaveElementAsImageOptions = {}) {
  const dataUrl = await createElementImage(element, options)

  downloadImage(dataUrl, options.fileName)

  return dataUrl
}

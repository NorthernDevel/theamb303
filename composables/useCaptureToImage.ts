import html2canvas from 'html2canvas'

/**
 * A composable to capture an HTML element as an image and download it.
 */
export const useCaptureToImage = () => {
  /**
   * Capture an HTML element and download it as an image.
   * @param elementId - The ID of the HTML element to capture.
   * @param fileName - The name of the downloaded image file.
   */
  const captureAndDownload = async (elementId: string, fileName: string) => {
    // Find the HTML element to capture
    const element = document.getElementById(elementId)
    if (!element) {
      console.error(`Element with ID '${elementId}' not found.`)
      return
    }

    try {
      // Replace external image sources with inline base64
      const images = element.querySelectorAll('img')
      await Promise.all(
        Array.from(images).map(async (img) => {
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve()
            } else {
              img.onload = () => resolve()
            }
          })
        })
      )

      // Capture the element as a canvas
      const canvas = await html2canvas(element, {
        useCORS: true,
      })

      // Convert the canvas to a data URL (base64 image)
      const image = canvas.toDataURL('image/png')

      // Create a link element to download the image
      const link = document.createElement('a')
      link.href = image
      link.download = fileName

      // Append, trigger download, and clean up
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error capturing element:', error)
    }
  }

  return { captureAndDownload }
}

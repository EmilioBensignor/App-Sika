export function useImageCapture() {
    async function captureElement(el: HTMLElement, width: number, height: number): Promise<Blob> {
        const html2canvas = (await import('html2canvas')).default
        await document.fonts.ready
        const canvas = await html2canvas(el, {
            scale: 1,
            useCORS: true,
            width,
            height,
            backgroundColor: '#FEFEFE',
            logging: false,
        })
        return new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(b => b ? resolve(b) : reject(new Error('toBlob failed')), 'image/png')
        })
    }

    function downloadImage(blob: Blob, filename: string): void {
        const url = URL.createObjectURL(blob)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        if (isIOS) {
            window.open(url, '_blank')
            return
        }
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(url), 1000)
    }

    async function shareImage(blob: Blob, filename: string): Promise<void> {
        const file = new File([blob], filename, { type: 'image/png' })
        if (navigator.share) {
            try {
                await navigator.share({ files: [file], title: 'Mi resultado Sika' })
                return
            } catch (e) {
                if ((e as Error).name === 'AbortError') return
                // files not supported → fall through to download
            }
        }
        downloadImage(blob, filename)
    }

    return { captureElement, downloadImage, shareImage }
}

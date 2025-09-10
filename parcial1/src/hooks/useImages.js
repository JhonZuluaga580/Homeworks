import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useImagesContext } from '../context/ImagesContext.jsx'

export function useImages() {
  const { images, addImage } = useImagesContext()
  const [params] = useSearchParams()
  const q = (params.get('q') ?? '').toLowerCase().trim()

  const filtered = useMemo(() => {
    if (!q) return images
    return images.filter(img => img.title.toLowerCase().includes(q))
  }, [images, q])

  return { images, filtered, addImage }
}

import { createContext, useContext, useEffect, useState } from 'react'

const ImagesContext = createContext(null)

export function ImagesProvider({ children }) {
  const [images, setImages] = useState(() => {
    try {
      const raw = localStorage.getItem('images')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images))
  }, [images])

  const addImage = (image) => {
    setImages(prev => {
      // evita duplicados por id
      if (prev.some(x => x.id === image.id)) {
        // si ya existe, lo reemplaza (o podrías ignorar)
        return prev.map(x => (x.id === image.id ? image : x))
      }
      return [...prev, image]
    })
  }

  const value = { images, addImage }
  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>
}

export function useImagesContext() {
  const ctx = useContext(ImagesContext)
  if (!ctx) throw new Error('useImagesContext must be used within ImagesProvider')
  return ctx
}

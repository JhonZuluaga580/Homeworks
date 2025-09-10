import { useState } from 'react'
import { useImagesContext } from '../context/ImagesContext.jsx'
import { picsumUrl } from '../services/picsum.js'

export default function ImageForm() {
  const { addImage } = useImagesContext()
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const numId = Number(id)
    if (!title.trim() || Number.isNaN(numId)) return

    const image = { id: numId, title: title.trim(), url: picsumUrl(numId) }
    addImage(image)

    window.location.reload()
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '.5rem', margin: '1rem 0' }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="ID (number)"
        value={id}
        onChange={(e) => setId(e.target.value)}
        inputMode="numeric"
      />
      <button type="submit">Add Image</button>
    </form>
  )
}

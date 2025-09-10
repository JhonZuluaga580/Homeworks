import { useImages } from '../hooks/useImages.js'
import ImageCard from './ImageCard.jsx'
import EmptyState from './EmptyState.jsx'

export default function ImageList() {
  const { filtered } = useImages()

  if (!filtered.length) return <EmptyState text="No images to show." />

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem'
      }}
    >
      {filtered.map(img => <ImageCard key={img.id} image={img} />)}
    </div>
  )
}

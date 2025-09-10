import ImageForm from '../components/ImageForm.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ImageList from '../components/ImageList.jsx'

export default function GalleryPage() {
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Image Gallery (Parcial 1)</h1>
      <ImageForm />
      <SearchBar />
      <ImageList />
    </div>
  )
}

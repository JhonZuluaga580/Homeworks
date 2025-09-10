import { Routes, Route, Navigate } from 'react-router-dom'
import GalleryPage from './pages/GalleryPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GalleryPage />} />
      {/* 404 → redirige a raíz */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

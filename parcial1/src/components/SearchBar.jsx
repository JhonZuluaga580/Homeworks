import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function SearchBar() {
  const [params, setParams] = useSearchParams()
  const initialQ = params.get('q') ?? ''
  const [q, setQ] = useState(initialQ)

  // Mantén sincronizado el input si cambian los params desde fuera
  useEffect(() => { setQ(initialQ) }, [initialQ])

  const onSubmit = (e) => {
    e.preventDefault()
    // Actualiza ?q= en la URL
    if (q) setParams({ q })
    else setParams({})
    // Requisito del parcial: refrescar para ver filtros aplicados
    window.location.reload()
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: '.5rem', margin: '1rem 0' }}>
      <input
        placeholder="Search by title…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit">Filter</button>
    </form>
  )
}

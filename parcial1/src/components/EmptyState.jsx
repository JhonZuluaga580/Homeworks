export default function EmptyState({ text = 'Empty' }) {
  return (
    <p style={{ opacity: .7, padding: '1rem 0' }}>{text}</p>
  )
}

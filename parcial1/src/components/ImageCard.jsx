import PropTypes from 'prop-types'

export default function ImageCard({ image }) {
  return (
    <article style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
      <img src={image.url} alt={image.title} width="100%" height="300" />
      <div style={{ padding: '.5rem .75rem' }}>
        <strong>{image.title}</strong>
        <div>ID: {image.id}</div>
      </div>
    </article>
  )
}

ImageCard.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

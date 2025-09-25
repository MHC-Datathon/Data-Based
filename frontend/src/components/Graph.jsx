export default function Graph({src, alt}) {
    return (
      <div style={{width: '100%', maxWidth: 1200, margin: '0 auto'}}>
        <img src={src} alt={alt} style={{display: 'block', width: '100%', height: 'auto'}}
        />
      </div>
    );
  }
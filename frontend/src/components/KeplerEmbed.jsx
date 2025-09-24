export default function KeplerEmbed({ src, title, height = '80vh' }) {
    return (
      <iframe
        src={src}
        title={title}
        style={{ width: '100%', height, border: 0 }}
        allow="clipboard-write; fullscreen"
      />
    );
  }
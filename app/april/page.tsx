export default function AprilPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(0,0,0,0.78) 65%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '20px',
          animation: 'zoomIn 1.2s ease-out',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(56px, 12vw, 180px)',
            margin: 0,
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: '4px',
            color: '#ffd700',
            textTransform: 'uppercase',
            textShadow:
              '0 0 10px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,140,0,0.4)',
          }}
        >
          April
          <br />
          Scherz
        </h1>

        <p
          style={{
            marginTop: '24px',
            fontSize: 'clamp(20px, 3vw, 36px)',
            color: 'white',
            textShadow: '0 0 12px rgba(0,0,0,0.8)',
          }}
        >
          😄 Reingefallen.
        </p>
      </div>

      <style>{`
        @keyframes zoomIn {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

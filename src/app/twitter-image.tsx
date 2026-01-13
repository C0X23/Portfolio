import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Corentin Megret - Développeur Full Stack';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1c1917 0%, transparent 50%), radial-gradient(circle at 75% 75%, #292524 0%, transparent 50%)',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: '#fafaf9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: '#0a0a0a',
            }}
          >
            CM
          </div>
          <span style={{ color: '#78716c', fontSize: 20 }}>cmegret.dev</span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#a8a29e',
              marginBottom: 16,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#fafaf9',
              marginBottom: 16,
              letterSpacing: -2,
            }}
          >
            Corentin Megret
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#a8a29e',
              marginBottom: 40,
            }}
          >
            Développeur Full Stack
          </div>
          
          {/* Tech tags */}
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            {['React', 'Next.js', 'TypeScript', 'Python', 'C/C++'].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#1c1917',
                  borderRadius: 9999,
                  color: '#d6d3d1',
                  fontSize: 18,
                  border: '1px solid #292524',
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#57534e',
            fontSize: 16,
          }}
        >
          <span>2026</span>
          <span>•</span>
          <span>Available for hire</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

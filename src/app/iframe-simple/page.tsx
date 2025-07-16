'use client'

export default function IframeSimplePage() {
  return (
    <div style={{ height: '100vh', margin: 0, padding: 0 }}>
      <iframe
        src="http://37.187.141.70:3002/"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="External Content - Simple View"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  )
}

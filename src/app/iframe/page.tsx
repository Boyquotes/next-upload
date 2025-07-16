'use client'

import { useState, useEffect } from 'react'

export default function IframePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    setError(false)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(false)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>Iframe Viewer</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a 
            href="/"
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            ← Retour Upload
          </a>
          <a 
            href="http://37.187.141.70:3002/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            Ouvrir dans nouvel onglet ↗
          </a>
        </div>
      </div>

      <div style={{
        padding: '10px 20px',
        backgroundColor: '#e9ecef',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>URL:</strong> http://37.187.141.70:3002/
        {!isLoaded && !error && (
          <span style={{ marginLeft: '10px', color: '#007bff' }}>
            Chargement...
          </span>
        )}
        {error && (
          <span style={{ marginLeft: '10px', color: '#dc3545' }}>
            ⚠️ Erreur de chargement - Vérifiez que l'URL est accessible
          </span>
        )}
        {isLoaded && (
          <span style={{ marginLeft: '10px', color: '#28a745' }}>
            ✅ Chargé
          </span>
        )}
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <iframe
          src="http://37.187.141.70:3002/"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'white'
          }}
          title="External Content"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      <div style={{
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #dee2e6',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0 }}>
          ⚠️ Contenu externe - Assurez-vous que l'URL est fiable et sécurisée
        </p>
      </div>
    </div>
  )
}

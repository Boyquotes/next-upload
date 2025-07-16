'use client'

import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadedFile {
  name: string
  size: number
  uploadedAt: string
  url: string
}

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState([] as UploadedFile[])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onDrop = async (acceptedFiles: File[]) => {
    setUploading(true)
    setMessage('')
    setError('')

    try {
      const formData = new FormData()
      acceptedFiles.forEach((file) => {
        formData.append('files', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(`${result.count} fichier(s) uploadé(s) avec succès!`)
        loadUploadedFiles() // Recharger la liste des fichiers
      } else {
        setError(result.error || 'Erreur lors de l\'upload')
      }
    } catch (err) {
      setError('Erreur réseau lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }

  const loadUploadedFiles = async () => {
    try {
      const response = await fetch('/api/upload')
      const result = await response.json()
      setUploadedFiles(result.files || [])
    } catch (err) {
      console.error('Erreur lors du chargement des fichiers:', err)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB max
  })

  useEffect(() => {
    loadUploadedFiles()
  }, [])

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
        Upload de Fichiers avec Next.js
      </h1>

      <div
        {...getRootProps()}
        className={`upload-area ${isDragActive ? 'drag-active' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez les fichiers ici...</p>
        ) : (
          <div>
            <p>Glissez-déposez des fichiers ici, ou cliquez pour sélectionner</p>
            <button className="upload-button" disabled={uploading}>
              {uploading ? 'Upload en cours...' : 'Sélectionner des fichiers'}
            </button>
          </div>
        )}
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Fichiers uploadés ({uploadedFiles.length})</h3>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="uploaded-file">
              <div className="file-info">
                <div className="file-name">
                  <a href={file.url} className="file-link" target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </div>
                <div className="file-size">
                  {formatFileSize(file.size)} - {formatDate(file.uploadedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center', color: '#666' }}>
        <p>Taille max par fichier: 10MB</p>
        <p>Formats supportés: tous types de fichiers</p>
      </div>
    </div>
  )
}

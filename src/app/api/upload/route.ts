import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files received' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'uploads')
    
    // Créer le répertoire uploads s'il n'existe pas
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Le répertoire existe déjà
    }

    const uploadedFiles: string[] = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Générer un nom de fichier unique avec timestamp
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name}`
      const filepath = path.join(uploadDir, filename)

      await writeFile(filepath, buffer)
      uploadedFiles.push(filename)
    }

    return NextResponse.json({ 
      message: 'Files uploaded successfully',
      files: uploadedFiles,
      count: uploadedFiles.length
    })

  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const fs = require('fs')
    const uploadDir = path.join(process.cwd(), 'uploads')
    
    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({ files: [] })
    }

    const files = fs.readdirSync(uploadDir)
    const fileList = files.map((filename: string) => {
      const filepath = path.join(uploadDir, filename)
      const stats = fs.statSync(filepath)
      return {
        name: filename,
        size: stats.size,
        uploadedAt: stats.birthtime,
        url: `/api/files/${filename}`
      }
    })

    return NextResponse.json({ files: fileList })

  } catch (error) {
    console.error('Error listing files:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}

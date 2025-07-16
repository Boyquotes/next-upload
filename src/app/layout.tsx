import './globals.css'

export const metadata = {
  title: 'File Upload App',
  description: 'Upload files with React Dropzone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import {
  downloadDriveFile,
  DriveAccessError,
  DriveConfigurationError,
} from '@/lib/google-drive.server'

function safeFilename(name: string) {
  return name.replace(/[\r\n"\\/]/g, '_')
}

export const Route = createFileRoute('/api/drive/download/$fileId')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const courseId = new URL(request.url).searchParams.get('courseId')?.trim()
        if (!courseId) return new Response('A course is required.', { status: 400 })

        try {
          const file = await downloadDriveFile(courseId, params.fileId)
          const headers = new Headers({
            'Content-Type': file.mimeType,
            'Content-Disposition': `attachment; filename="${safeFilename(file.name)}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
            'Cache-Control': 'private, no-store',
            'X-Content-Type-Options': 'nosniff',
          })
          if (file.size) headers.set('Content-Length', file.size)
          return new Response(file.body, { headers })
        } catch (error) {
          if (error instanceof DriveConfigurationError) {
            return new Response(error.message, { status: 503 })
          }
          if (error instanceof DriveAccessError) {
            return new Response(error.message, { status: 403 })
          }
          return new Response('The file could not be downloaded.', { status: 502 })
        }
      },
    },
  },
})

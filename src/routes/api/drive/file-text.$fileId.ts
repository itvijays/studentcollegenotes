import { createFileRoute } from '@tanstack/react-router'
import { fetchDriveFileText, DriveConfigurationError } from '@/lib/google-drive.server'

export const Route = createFileRoute('/api/drive/file-text/$fileId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const text = await fetchDriveFileText(params.fileId)
          return new Response(text, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'private, max-age=300',
            },
          })
        } catch (error) {
          if (error instanceof DriveConfigurationError) {
            return new Response(error.message, { status: 503 })
          }
          return new Response('Could not fetch file content.', { status: 502 })
        }
      },
    },
  },
})

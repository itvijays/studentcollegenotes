import { createFileRoute } from '@tanstack/react-router'
import {
  DriveAccessError,
  DriveConfigurationError,
  listDriveFolder,
} from '@/lib/google-drive.server'

export const Route = createFileRoute('/api/drive/files')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const courseId = url.searchParams.get('courseId')?.trim()
        const folderId = url.searchParams.get('folderId')?.trim() || undefined

        if (!courseId) {
          return Response.json({ error: 'A course is required.' }, { status: 400 })
        }

        try {
          return Response.json(await listDriveFolder(courseId, folderId), {
            headers: { 'Cache-Control': 'private, max-age=60' },
          })
        } catch (error) {
          if (error instanceof DriveConfigurationError) {
            return Response.json({ error: error.message, unconfigured: true }, { status: 503 })
          }
          if (error instanceof DriveAccessError) {
            return Response.json({ error: error.message }, { status: 403 })
          }
          return Response.json(
            { error: 'Drive files could not be loaded. Check folder sharing and try again.' },
            { status: 502 },
          )
        }
      },
    },
  },
})

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/drive/file-text/$fileId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { fileId } = params

        // Try plain text export first (works for Google Docs)
        // Fall back to direct media download (works for uploaded .txt/.py/etc files)
        const urls = [
          `https://drive.google.com/uc?export=download&id=${fileId}`,
          `https://docs.google.com/document/d/${fileId}/export?format=txt`,
        ]

        for (const url of urls) {
          const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            redirect: 'follow',
          })

          if (!res.ok) continue

          const contentType = res.headers.get('content-type') ?? ''
          // Skip HTML pages (Drive login/error pages)
          if (contentType.includes('text/html')) continue

          const text = await res.text()
          return new Response(text, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'private, max-age=300',
            },
          })
        }

        return new Response(
          'Could not load file. Make sure it is shared as "Anyone with the link can view".',
          { status: 502 },
        )
      },
    },
  },
})

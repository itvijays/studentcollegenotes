'use client'

import { useState } from 'react'
import useSWR from 'swr'
import {
  AlertCircle,
  ChevronRight,
  Download,
  ExternalLink,
  File,
  FileText,
  Folder,
  HardDrive,
  LoaderCircle,
  RefreshCw,
} from 'lucide-react'

interface DriveItem {
  id: string
  name: string
  mimeType: string
  isFolder: boolean
  isGoogleFile: boolean
  size: number | null
  modifiedTime: string | null
  webViewLink: string | null
}

interface FolderResponse {
  folderId: string
  courseFolderId: string
  items: DriveItem[]
}

interface ApiError extends Error {
  unconfigured?: boolean
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  const body = await response.json()
  if (!response.ok) {
    const error = new Error(body.error || 'Files could not be loaded.') as ApiError
    error.unconfigured = body.unconfigured
    throw error
  }
  return body as FolderResponse
}

function formatBytes(bytes: number | null) {
  if (bytes === null) return 'Drive file'
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes / 1024
  let unit = units[0]
  for (let index = 1; index < units.length && value >= 1024; index += 1) {
    value /= 1024
    unit = units[index]
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${unit}`
}

function formatDate(value: string | null) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value))
}

export function DriveFileBrowser({ courseId, folderConfigured }: { courseId: string; folderConfigured: boolean }) {
  const [folders, setFolders] = useState<Array<{ id?: string; name: string }>>([
    { name: 'Course files' },
  ])
  const currentFolderId = folders.at(-1)?.id
  const query = new URLSearchParams({ courseId })
  if (currentFolderId) query.set('folderId', currentFolderId)

  const { data, error, isLoading, mutate } = useSWR<FolderResponse, ApiError>(
    folderConfigured ? `/api/drive/files?${query.toString()}` : null,
    fetcher,
    { keepPreviousData: false },
  )

  if (!folderConfigured) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <HardDrive className="mx-auto h-8 w-8 text-blue-600" />
        <h2 className="mt-3 text-lg font-bold text-slate-900">Connect this course folder</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Replace this course&apos;s placeholder <code className="rounded bg-slate-100 px-1.5 py-0.5">driveFolderId</code> in <code className="rounded bg-slate-100 px-1.5 py-0.5">src/data/courses.ts</code> with its Google Drive folder ID.
        </p>
      </div>
    )
  }

  return (
    <section aria-labelledby="drive-files-heading" className="flex flex-col gap-4">
      <div>
        <h2 id="drive-files-heading" className="text-xl font-bold text-slate-900">Course Files</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          Browse read-only folders. Regular files download here; Google files open in Drive preview.
        </p>
      </div>

      <nav aria-label="Folder breadcrumbs" className="overflow-x-auto rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <ol className="flex min-w-max items-center gap-1 text-sm">
          {folders.map((folder, index) => (
            <li key={`${folder.id ?? 'root'}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-4 w-4 text-slate-400" />}
              <button
                type="button"
                onClick={() => setFolders((current) => current.slice(0, index + 1))}
                aria-current={index === folders.length - 1 ? 'page' : undefined}
                className={`rounded-lg px-2 py-1 font-medium transition-colors ${
                  index === folders.length - 1 ? 'text-slate-900' : 'text-blue-600 hover:bg-slate-100'
                }`}
              >
                {folder.name}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-10 text-sm text-slate-500">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading files…
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <AlertCircle className="mx-auto h-7 w-7 text-amber-700" />
          <p className="mt-3 text-sm font-semibold text-slate-900">{error.message}</p>
          <button type="button" onClick={() => mutate()} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
        </div>
      )}

      {data && data.items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Folder className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-3 text-sm font-medium text-slate-600">This folder is empty.</p>
        </div>
      )}

      {data && data.items.length > 0 && (
        <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {data.items.map((item) => {
            const Icon = item.isFolder ? Folder : item.isGoogleFile ? FileText : File
            const actionLabel = item.isFolder ? `Open ${item.name}` : item.isGoogleFile ? `Preview ${item.name}` : `Download ${item.name}`
            const content = (
              <>
                <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${item.isFolder ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-slate-900">{item.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {item.isFolder ? 'Folder' : formatBytes(item.size)}{item.modifiedTime ? ` · ${formatDate(item.modifiedTime)}` : ''}
                  </span>
                </span>
                {item.isFolder ? <ChevronRight className="h-5 w-5 flex-none text-slate-400" /> : item.isGoogleFile ? <ExternalLink className="h-5 w-5 flex-none text-slate-400" /> : <Download className="h-5 w-5 flex-none text-slate-400" />}
              </>
            )

            return (
              <li key={item.id} className="border-b border-slate-100 last:border-b-0">
                {item.isFolder ? (
                  <button type="button" aria-label={actionLabel} onClick={() => setFolders((current) => [...current, { id: item.id, name: item.name }])} className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50">
                    {content}
                  </button>
                ) : (
                  <a
                    href={item.isGoogleFile ? item.webViewLink ?? '#' : `/api/drive/download/${encodeURIComponent(item.id)}?courseId=${encodeURIComponent(courseId)}`}
                    target={item.isGoogleFile ? '_blank' : undefined}
                    rel={item.isGoogleFile ? 'noopener noreferrer' : undefined}
                    aria-label={actionLabel}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50"
                  >
                    {content}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

import { Readable } from 'node:stream'
import { google, type drive_v3 } from 'googleapis'
import courses from '@/data/courses'

export const DRIVE_ROOT_FOLDER_ID = '1_hEs4quoqdEsoR0cAfdTqf0RRaOz-gpy'
export const FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder'
const GOOGLE_MIME_PREFIX = 'application/vnd.google-apps.'

export interface DriveItem {
  id: string
  name: string
  mimeType: string
  isFolder: boolean
  isGoogleFile: boolean
  size: number | null
  modifiedTime: string | null
  webViewLink: string | null
}

export class DriveConfigurationError extends Error {}
export class DriveAccessError extends Error {}

function getDriveClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!email || !privateKey) {
    throw new DriveConfigurationError('Google Drive is not configured yet.')
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })

  return google.drive({ version: 'v3', auth })
}

export function getCourseFolderId(courseId: string) {
  const course = courses.find((item) => item.id === courseId)
  if (!course) throw new DriveAccessError('Course not found.')
  if (course.driveFolderId.startsWith('REPLACE_WITH_')) {
    throw new DriveConfigurationError('This course folder has not been connected yet.')
  }
  return course.driveFolderId
}

async function getFile(drive: drive_v3.Drive, fileId: string) {
  const response = await drive.files.get({
    fileId,
    fields: 'id,name,mimeType,parents,size,modifiedTime,webViewLink',
    supportsAllDrives: true,
  })
  return response.data
}

async function assertDescendant(
  drive: drive_v3.Drive,
  itemId: string,
  allowedFolderId: string,
) {
  if (itemId === allowedFolderId) return

  const visited = new Set<string>()
  let frontier = [itemId]

  while (frontier.length) {
    const currentId = frontier.shift()!
    if (visited.has(currentId)) continue
    visited.add(currentId)

    const item = await getFile(drive, currentId)
    const parents = item.parents ?? []
    if (parents.includes(allowedFolderId)) return
    frontier.push(...parents.filter((parent) => parent !== DRIVE_ROOT_FOLDER_ID))
  }

  throw new DriveAccessError('The requested item is outside this course folder.')
}

export async function listDriveFolder(courseId: string, requestedFolderId?: string) {
  const drive = getDriveClient()
  const courseFolderId = getCourseFolderId(courseId)
  const folderId = requestedFolderId || courseFolderId
  await assertDescendant(drive, folderId, courseFolderId)

  const items: DriveItem[] = []
  let pageToken: string | undefined

  do {
    const response = await drive.files.list({
      q: `'${folderId.replace(/'/g, "\\'")}' in parents and trashed = false`,
      fields: 'nextPageToken,files(id,name,mimeType,size,modifiedTime,webViewLink)',
      orderBy: 'folder,name_natural',
      pageSize: 100,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    })

    for (const file of response.data.files ?? []) {
      if (!file.id || !file.name || !file.mimeType) continue
      items.push({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        isFolder: file.mimeType === FOLDER_MIME_TYPE,
        isGoogleFile:
          file.mimeType.startsWith(GOOGLE_MIME_PREFIX) && file.mimeType !== FOLDER_MIME_TYPE,
        size: file.size ? Number(file.size) : null,
        modifiedTime: file.modifiedTime ?? null,
        webViewLink: file.webViewLink ?? null,
      })
    }

    pageToken = response.data.nextPageToken ?? undefined
  } while (pageToken)

  items.sort((a, b) => Number(b.isFolder) - Number(a.isFolder) || a.name.localeCompare(b.name))
  return { folderId, courseFolderId, items }
}

export async function fetchDriveFileText(fileId: string): Promise<string> {
  const drive = getDriveClient()
  const response = await drive.files.get(
    { fileId, alt: 'media', supportsAllDrives: true },
    { responseType: 'text' },
  )
  return response.data as unknown as string
}

export async function downloadDriveFile(courseId: string, fileId: string) {
  const drive = getDriveClient()
  const courseFolderId = getCourseFolderId(courseId)
  await assertDescendant(drive, fileId, courseFolderId)
  const metadata = await getFile(drive, fileId)

  if (metadata.mimeType?.startsWith(GOOGLE_MIME_PREFIX)) {
    throw new DriveAccessError('Google files must be opened in Drive preview.')
  }

  const response = await drive.files.get(
    { fileId, alt: 'media', supportsAllDrives: true },
    { responseType: 'stream' },
  )

  return {
    body: Readable.toWeb(response.data as Readable) as ReadableStream,
    name: metadata.name ?? 'download',
    mimeType: metadata.mimeType ?? 'application/octet-stream',
    size: metadata.size ?? null,
  }
}

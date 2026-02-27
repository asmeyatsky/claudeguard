import JSZip from 'jszip'
import type { GeneratedArtifact } from '../domain/ports/template-engine-port'
import type { PackagerPort } from '../domain/ports/packager-port'

export class ZipPackager implements PackagerPort {
  async packageArtifacts(artifacts: GeneratedArtifact[], projectName: string): Promise<Blob> {
    const zip = new JSZip()
    const folder = zip.folder(projectName)

    if (!folder) {
      throw new Error('Failed to create ZIP folder')
    }

    for (const artifact of artifacts) {
      folder.file(artifact.filename, artifact.content)
    }

    return zip.generateAsync({ type: 'blob' })
  }
}

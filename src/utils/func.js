/**
 * Provides miscellaneous functions
 */
export class Func {
  /**
   * extract file name from url
   */
  static name (url){
    let slashPos = url.lastIndexOf('/')
    let backSlashPos = url.lastIndexOf('\\')
    let namePos = slashPos > backSlashPos ? slashPos : backSlashPos

    let dotPos = url.lastIndexOf('.')
    if (dotPos === -1) dotPos = url.length

    return url.slice(namePos + 1, dotPos)
  }
}

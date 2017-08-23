/**
 * Provides miscellaneous functions
 */
export class Func {
  /**
   * extract file name from url
   * @param {string} url
   * @return {string}
   */
  static name (url){
    let slashPos = url.lastIndexOf('/')
    let backSlashPos = url.lastIndexOf('\\')
    let namePos = slashPos > backSlashPos ? slashPos : backSlashPos

    let dotPos = url.lastIndexOf('.')
    if (dotPos === -1) dotPos = url.length

    return url.slice(namePos + 1, dotPos)
  }

  /**
   * whether num is power-of-2
   * @param {number} num
   * @return {bool}
   */
  static powerOfTwo (num){
    if (num < 1) return false

    while (num > 1){
      if (Math.floor(num) !== num) return false
      num /= 2
    }

    return num === 1
  }

  /**
   * return smallest power-of-2 which is larger than num
   * @param {number} num
   * @return {number}
   */
  static nextPowerOfTwo (num){
    let ans = 1

    while (ans < num){
      ans *= 2
    }

    return ans
  }
}

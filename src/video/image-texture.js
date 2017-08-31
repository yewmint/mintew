import { Func } from '../utils'
import { Texture } from './texture'
export class ImageTexture extends Texture {
  /**
  * @param {Image} img
  * @param {WebGl} webgl
  */
  constructor (img, webgl) {
    super (webgl)
    this._createFitTexture(img)
  }

  /**
  * create texture to fit power-of-2 image
  * @private
  * @param {Image} img
  */
  _createFitTexture (img){
    this.width = img.width
    this.height = img.height

    let webgl = this._webgl
    let texWidth = Func.nextPowerOfTwo(img.width)
    let texHeight = Func.nextPowerOfTwo(img.height)

    this._xScale = img.width / texWidth
    this._yScale = img.height / texHeight

    let cvs = document.createElement('canvas')
    let ctx = cvs.getContext('2d')
    cvs.width = texWidth
    cvs.height = texHeight

    ctx.drawImage(img, 0, texHeight - img.height)
    let fixedImg = ctx.getImageData(0, 0, texHeight, texWidth)
    this._glTex = webgl.loadTexture(fixedImg)
  }
}

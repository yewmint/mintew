
import { Func } from '../utils'
import { Texture } from './texture'
export class TextTexture extends Texture {
  /**
  * @param {string} text
  * @param {WebGl} webgl
  * @param {object} options
  */
  constructor (
    text,
    webgl,
    {
      size = 20,
      font = 'serif',
      fontType = '',
      color = 'black',
      width = 100
    }
  ) {
    super (webgl)
    let data = this._createTextTexture(text, size, font, color, width, fontType)
    this._createFitTexture(data)
  }

  /**
  * create texture to fit power-of-2 image
  * @private
  * @param {ImageData} data
  */
  _createFitTexture (data){
    this.width = data.width
    this.height = data.height

    let webgl = this._webgl
    let texWidth = Func.nextPowerOfTwo(data.width)
    let texHeight = Func.nextPowerOfTwo(data.height)

    this._xScale = data.width / texWidth
    this._yScale = data.height / texHeight

    let cvs = document.createElement('canvas')
    let ctx = cvs.getContext('2d')
    cvs.width = texWidth
    cvs.height = texHeight

    ctx.putImageData(data, 0, texHeight - data.height)
    // document.body.appendChild(cvs)
    let fixedImg = ctx.getImageData(0, 0, texWidth, texHeight)
    this._glTex = webgl.loadTexture(fixedImg)
  }

  /**
  * create texture to fit power-of-2 image
  * @private
  * @param {string} text
  * @param {number} size
  * @param {string} font
  * @param {string} color
  * @param {number} width
  */
  _createTextTexture (text, size, font, color, width, fontType){
    let cvs = document.createElement('canvas')
    let ctx = cvs.getContext('2d')
    ctx.font = `${fontType} ${size}px "${font}"`

    let lines = []
    let start = 0
    for (let i = 0; i < text.length; ++i){
      let substr = text.slice(start, i + 1)
      if (ctx.measureText(substr).width > width){
        lines.push(text.slice(start, i))
        start = i
      }
    }
    lines.push(text.slice(start))

    let lineHeight = size * 1.3
    let cvsWidth = lines.length > 1 ? width : ctx.measureText(lines[0]).width
    let cvsHeight = lineHeight * lines.length

    cvs.width = cvsWidth
    cvs.height = cvsHeight
    ctx.font = `${fontType} ${size}px "${font}"`
    ctx.fillStyle = color

    for (let i = 0; i < lines.length; ++i){
      let x = 0
      let y = i * lineHeight + size
      ctx.fillText(lines[i], x, y)
    }
    // document.body.appendChild(cvs)

    return ctx.getImageData(0, 0, cvsWidth, cvsHeight)
  }
}

/**
* Texture Object
* @file texture.js
* @author yewmint
*/

import { Func } from '../utils'

/**
* Texture provides functionality to hold WebGLTexture.
* In case of non power-of-2 texture, Texture expand it into power-of-2 texture.
*/
export class Texture {
  /**
  * @param {Image} img
  * @param {WebGl} webgl
  */
  constructor (img, webgl) {
    /**
    * width of texture
    * @type {number} width
    */
    this.width = img.width

    /**
    * height of texture
    * @type {number} height
    */
    this.height = img.height

    this._createTexture(img, webgl)
  }

  /**
  * bind texture to webgl
  * @param {WebGL} webgl
  */
  bind (webgl){
    webgl.texture(this._glTex)
  }

  /**
  * convert coordinate to fit power-of-2 texture
  * @param {number} x
  * @param {nubmer} y
  * @return {{x: number, y: number}}
  */
  convCoord (x, y){
    return {
      x: x * this._xScale,
      y: y * this._yScale
    }
  }

  /**
  * create texture to fit power-of-2 image
  * @private
  * @param {Image} img
  * @param {WebGL} webgl
  */
  _createTexture (img, webgl){
    let texWidth = Func.nextPowerOfTwo(img.width)
    let texHeight = Func.nextPowerOfTwo(img.height)

    /**
    * x scale to fit power-of-2 width
    * @type {number} _xScale
    */
    this._xScale = img.width / texWidth

    /**
    * y scale to fit power-of-2 height
    * @type {number} _yScale
    */
    this._yScale = img.height / texHeight

    let cvs = document.createElement('canvas')
    let ctx = cvs.getContext('2d')
    cvs.width = texWidth
    cvs.height = texHeight

    ctx.drawImage(img, 0, texHeight - img.height)
    let fixedImg = ctx.getImageData(0, 0, texHeight, texWidth)

    /**
    * gl texture created by webgl
    * @type {WebGLTexture} _glTex
    */
    this._glTex = webgl.loadTexture(fixedImg)
  }
}

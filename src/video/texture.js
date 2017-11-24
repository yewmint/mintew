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
  * @param {WebGL} webgl
  */
  constructor (webgl) {
    /**
    * x scale to fit power-of-2 width
    * @type {number}
    */
    this._xScale = 1

    /**
    * y scale to fit power-of-2 height
    * @type {number}
    */
    this._yScale = 1

    /**
    * gl texture created by webgl
    * @type {WebGLTexture}
    */
    this._glTex = null

    /**
    * webgl instance
    * @type {WebGL}
    */
    this._webgl = webgl
  }

  /**
  * bind texture to webgl
  */
  bind (){
    this._webgl.texture(this._glTex)
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
  * @param {Image|ImageData} data
  */
  _createFitTexture (data){
    throw new Error('Texture: must override this method.')
  }

  /**
  * clear texture
  */
  release(){
    let webgl = this._webgl
    let tex = this._glTex
    if (webgl.isTexture(tex)){
      webgl.deleteTexture(tex)
    }
  }
}

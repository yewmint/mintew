/**
 * Sprite Object
 * @file sprite.js
 * @author yewmint
 */

import { PaintNode } from './paint-node'
import { Mat, Rect, Point } from '../math'

/**
* Sprite for painting
*/
export class Sprite extends PaintNode {
  /**
   * @param {WebGL} webgl webgl instance
   * @param {Texture} texture texture instance
   */
  constructor (webgl, texture, uv = Rect.one()){
    super()

    /**
    * webgl instance
    * can not be modifed
    * @private
    * @type {WebGL}
    */
    this._webgl = webgl

    /**
     * box for painting
     * @private
     * @type {Box}
     */
    this._box = webgl.box()

    /**
    * uv for texture
    * can not be modifed
    * @private
    * @type {Rect}
    */
    this._uv = uv

    /**
     * texture of sprite
     * @private
     * @type {Texture}
     */
    this._texture = texture

    /**
    * width of sprite
    * @private
    * @type {number}
    */
    this._width = texture.width * (uv.ex - uv.bx)

    /**
    * height of sprite
    * @private
    * @type {number}
    */
    this._height = texture.height * (uv.ey - uv.by)

    this._updateBox()
    this._updateTransform()
  }

  /**
  * width of sprite
  */
  get width (){
    return this._width
  }

  /**
  * width of sprite
  */
  set width (val){
    throw new Error('Sprite: can not modify width.')
  }

  /**
  * height of sprite
  */
  get height (){
    return this._height
  }

  /**
  * height of sprite
  */
  set height (val){
    throw new Error('Sprite: can not modify height.')
  }

  /**
  * udpate box data
  */
  _updateBox (){
    let tex = this._texture
    let uv = this._uv
    let box = this._box

    let bpt = tex.convCoord(uv.bx, uv.by)
    let ept = tex.convCoord(uv.ex, uv.ey)

    box.size(this.width, this.height)
    box.uv(bpt.x, bpt.y, ept.x, ept.y)
  }

  /**
  * paint sprite on canvas
  * @param {Mat} ctxTransform transform of context
  * @param {number} ctxOpacity opacity of context
  */
  paint (ctxTransform = Mat.eye(4, 1), ctxOpacity = 1){
    let webgl = this._webgl
    let curTran = this._transform
    let tran = ctxTransform.multiply(curTran)
    let opacity = ctxOpacity * this.opacity

    webgl.opacity(opacity)
    this._texture.bind(webgl)
    webgl.transform(tran)
    webgl.drawBox(this._box)
  }
}

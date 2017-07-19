/**
 * Sprite Object
 * @file sprite.js
 * @author yewmint
 */

import { Rect } from '../utils'

 /**
  * Sprite for painting
  */
export class Sprite {
  /**
   * @param {WebGL} webgl webgl instance
   * TODO: add uv, size
   */
  constructor (webgl, size, texture, uv = Rect.one()){
    /**
     * webgl instance
     * @private
     * @type {WebGL} _webgl
     */
    this._webgl = webgl

    /**
     * box for painting
     * @private
     * @type {Box} _box
     */
    this._box = webgl.box()

    /**
     * texture of sprite
     * @type {WebGLTexture} texture
     */
    this.texture = texture

    /**
     * position of sprite
     * @type {Point} position
     */
    this.position = Point.origin()

    /**
     * pivot of sprite
     * @type {Point} pivot
     */
    this.pivot = Point.origin()

    /**
     * rotation of sprite
     * @type {number} rotation
     */
    this.rotation = 0

    /**
     * scale of sprite
     * @type {Point} scale
     */
    this.scale = Point.origin()
  }

  paint (ctxPos, ctxRot, ctxScl){
    let webgl = this.webgl
    let curPos = this.position.add(ctxPos)
    let curRot = this.rotation + ctxRot
    let curScl = this.scale.add(ctxScl)

    webgl.texture(this.texture)
    webgl.translate(curPos.x, curPos.y)
    webgl.rotate(curRot)
    webgl.pivot(this.pivot)
    webgl.scale(curScl.x, curScl.y)

    webgl.drawBox(this._box)
  }
}

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
   * @param {Texture} texture texture instance
   */
  constructor (webgl, texture, uv = Rect.one()){
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
    * uv for texture
    * @private
    * @type {Rect} _uv
    */
    this._uv = uv

    /**
     * texture of sprite
     * @type {Texture} texture
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

    this._updateBox()
  }

  /**
  * udpate box data
  */
  _updateBox (){
    let tex = this.texture
    let uv = this._uv
    let box = this._box

    let bpt = tex.convCoord(uv.bx, uv.by)
    let ept = tex.convCoord(uv.ex, uv.ey)

    box.size(tex.width, tex.height)
    box.uv(bpt.x, bpt.y, ept.x, ept.y)
  }

  /**
  * paint sprite on canvas
  * @param {Point} ctxPos position of context
  * @param {number} ctxRot rotation of context
  * @param {Point} ctxScl scale of context
  */
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

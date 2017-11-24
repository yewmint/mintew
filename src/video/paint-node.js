/**
 * PaintNode Object
 * @file paint-node.js
 * @author yewmint
 */

import { Mat, Rect, Point } from '../math'

/**
* node of draw-tree
*/
export class PaintNode {
  /**
  *
  */
  constructor (){
    /**
    * opacity of node
    * @type {number}
    */
    this.opacity = 1

    /**
     * pivot of node
     * @private
     * @type {Point}
     */
    this._pivot = Point.origin()
    this._pivot.onChange(()=> this._updateTransform())

    /**
     * rotation of node
     * @private
     * @type {number}
     */
    this._rotation = 0

    /**
     * scale of node
     * @private
     * @type {Point}
     */
    this._scale = Point.one()
    this._scale.onChange(()=> this._updateTransform())

    /**
    * position of node
    * @private
    * @type {Point}
    */
    this._position = Point.origin()
    this._position.onChange(()=> this._updateTransform())

    /**
    * z index of node
    * @type {number}
    */
    this.zIndex = 0

    /**
    * transform of node, deduced from properties
    * @private
    * @type {Mat}
    */
    this._transform = Mat.eye(4, 1)
  }

  /**
  * pivot of sprite
  */
  get pivot (){
    return this._pivot
  }

  /**
  * pivot of sprite
  */
  set pivot (val){
    val.onChange(()=> this._updateTransform())
    this._pivot = val
    this._updateTransform()
  }

  /**
  * rotation of sprite
  */
  get rotation (){
    return this._rotation
  }

  /**
  * rotation of sprite
  */
  set rotation (val){
    this._rotation = val
    this._updateTransform()
  }

  /**
  * scale of sprite
  */
  get scale (){
    return this._scale
  }

  /**
  * scale of sprite
  */
  set scale (val){
    val.onChange(()=> this._updateTransform())
    this._scale = val
    this._updateTransform()
  }

  /**
  * position of sprite
  */
  get position (){
    return this._position
  }

  /**
  * position of sprite
  */
  set position (val){
    val.onChange(()=> this._updateTransform())
    this._position = val
    this._updateTransform()
  }

  /**
  * udpate transform data
  */
  _updateTransform (){
    let pvtTran = Mat.translate(-this._pivot.x, -this._pivot.y)
    let rotTran = Mat.rotate(this._rotation)
    let sclTran = Mat.scale(this._scale.x, this._scale.y)
    let posTran = Mat.translate(this._position.x, this._position.y)

    // must multiply in order
    let tran = Mat.eye(4, 1)
    tran = tran.multiply(posTran)
    tran = tran.multiply(rotTran)
    tran = tran.multiply(sclTran)
    tran = tran.multiply(pvtTran)

    this._transform = tran
  }
}

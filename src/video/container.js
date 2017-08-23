/**
 * Container Object
 * @file container.js
 * @author yewmint
 */

import { PaintNode } from './paint-node'
import { Mat, Rect, Point } from '../math'

/**
* Container for storing container or sprite
*/
export class Container extends PaintNode {
  /**
   *
   */
  constructor (){
    super()

    this._children = []
    this._updateTransform()
  }

  addChild (node){
    this._children.push(node)
    this._children.sort((na, nb) => nb.zIndex - na.zIndex)
  }

  removeChild (node){
    let loc = this._children.indexOf(node)
    if (loc !== -1){
      this._children.splice(loc, 1)
    }
  }

  /**
  * paint container on canvas
  * @param {Mat} ctxTransform transform of context
  * @param {number} ctxOpacity opacity of context
  */
  paint (ctxTransform = Mat.eye(4, 1), ctxOpacity = 1){
    let tran = ctxTransform.multiply(this._transform)
    let opacity = ctxOpacity * this.opacity

    for (let child of this._children){
      child.paint(tran, opacity)
    }
  }
}

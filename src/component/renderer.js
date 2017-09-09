import { Component } from './component'
import { Mat, Rect, Point } from '../math'

/**
* render texture on screen
*/
export class Renderer extends Component{
  /**
  *
  */
  constructor (entity){
    super(entity)

    /**
    * z index of renderer
    */
    this.zIndex = 0

    /**
    * opacity of renderer
    * @type {number} opacity
    */
    this.opacity = 1

    /**
    * opacity for painting
    * @type {number} globalOpacity
    */
    this.globalOpacity = 1
  }

  render (webgl){
    webgl.opacity(this.globalOpacity)
    webgl.transform(this.entity.transform.globalTransform)
  }

  update (ctx){
    let parentRenderer = ctx.parent.renderer
    if (parentRenderer){
      this.globalOpacity = this.opacity = parentRenderer.globalOpacity
    }
    else {
      this.globalOpacity = this.opacity
    }

    ctx.renderList.push(this)
  }
}

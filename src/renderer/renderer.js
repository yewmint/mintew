import { Component } from '../component'
import { Mat, Rect, Point } from '../math'
import { Context } from '../framework'

/**
 * render something on screen
 * 
 * @export
 * @class Renderer
 * @extends {Component}
 */
export class Renderer extends Component{
  /**
   * return name of component
   * 
   * @static
   * @returns {string}
   * @memberof Renderer
   */
  static name (){
    return 'renderer'
  }

  /**
   * Creates an instance of Renderer.
   * @param {Entity} entity 
   * @memberof Renderer
   */
  constructor (entity){
    super(entity)
  }

  /**
   * render texture
   * 
   * @param {any} webgl 
   * @memberof Renderer
   */
  render (webgl){
    webgl.opacity(this.entity.base.globalOpacity)
    webgl.transform(this.entity.transform.globalTransform)
  }

  /**
   * update renderer
   * 
   * @memberof Renderer
   */
  update (){
    this.render(Context.get('webgl'))
  }
}

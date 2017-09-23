import { Component } from '../component'
import { Mat, Rect, Point } from '../math'
import { Context } from '../framework'

/**
* render texture on screen
*/
export class Renderer extends Component{
  static name (){
    return 'renderer'
  }
  /**
  *
  */
  constructor (entity){
    super(entity)
  }

  render (webgl){
    webgl.opacity(this.entity.base.globalOpacity)
    webgl.transform(this.entity.transform.globalTransform)
  }

  update (){
    this.render(Context.get('webgl'))
  }
}

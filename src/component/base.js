import { Component } from './component'
import { Mat, Rect, Point } from '../math'
import { Entity } from '../framework'

/**
* render texture on screen
*/
export class Base extends Component{
  static name (){
    return 'base'
  }
  /**
  *
  */
  constructor (entity){
    super(entity)

    /**
    * z index of renderer
    */
    this._zIndex = 0

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

    this._resort()
  }

  get zIndex (){
    return this._zIndex
  }

  set zIndex (val){
    this._zIndex = val
    this._resort()
  }

  _resort (){
    if (this.entity.parent){
      this.entity.parent.sortChildren((a, b) => a.base.zIndex - b.base.zIndex)
    }
  }

  update (){
    if (this.parent){
      this.globalOpacity = this.opacity * this.parent.globalOpacity
    }
    else {
      this.globalOpacity = this.opacity
    }
  }
}

Entity.register(Base)

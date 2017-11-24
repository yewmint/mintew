import { Component } from './component'
import { Entity } from '../framework/entity.js'

/**
 * Base component for all entities,
 * provides z index and opacity.
 * 
 * @export
 * @class Base
 * @extends {Component}
 */
export class Base extends Component{
  /**
   * return name of component
   * 
   * @static
   * @returns {string}
   * @memberof Base
   */
  static name (){
    return 'base'
  }

  /**
   * Creates an instance of Base.
   * @param {Entity} entity 
   * @memberof Base
   */
  constructor (entity){
    super(entity)

    /**
     * z index of entity
     * @type {number}
     * @private
     */
    this._zIndex = 0

    /**
     * opacity of entity
     * @type {number}
     */
    this.opacity = 1

    /**
     * opacity for painting
     * @type {number}
     */
    this.globalOpacity = 1

    this._resort()
  }

  /**
   * get z index
   * 
   * @memberof Base
   */
  get zIndex (){
    return this._zIndex
  }

  /**
   * set z index and resort
   * 
   * @memberof Base
   */
  set zIndex (val){
    this._zIndex = val
    this._resort()
  }

  /**
   * resort siblings to correct z orders.
   * 
   * @private
   * @memberof Base
   */
  _resort (){
    if (this.entity.parent){
      this.entity.parent.sortChildren((a, b) => a.base.zIndex - b.base.zIndex)
    }
  }

  /**
   * update base component
   * 
   * @memberof Base
   */
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

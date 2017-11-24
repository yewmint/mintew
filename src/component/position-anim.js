import { Point, Mat } from '../math'
import { Context } from '../framework'
import { Entity } from '../framework/entity.js'
import { Component } from './component'
import { Tween } from '../utils'

/**
 * perform position animation
 * 
 * @export
 * @class PositionAnim
 * @extends {Component}
 */
export class PositionAnim extends Component {
  /**
   * return name of component
   * 
   * @static
   * @returns {string}
   * @memberof PositionAnim
   */
  static name (){
    return 'position-anim'
  }

  /**
   * Creates an instance of PositionAnim.
   * @param {Entity} entity 
   * @memberof PositionAnim
   */
  constructor (entity){
    super(entity)
    this.isAnimating = false
  }

  /**
   * start animation
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} duration 
   * @memberof PositionAnim
   */
  to (x, y, duration){
    this._prevPt = this.entity.transform.position.data
    this._nextPt = { x, y }
    this._startTime = new Date
    this._duration = duration
    this.isAnimating = true
  }

  /**
   * udpate animation
   * 
   * @memberof PositionAnim
   */
  update (){
    if (!this.isAnimating){
      return
    }

    let transform = this.entity.transform
    let prevPt = this._prevPt
    let nextPt = this._nextPt

    let elapsedTime = new Date - this._startTime
    let delta = elapsedTime / this._duration

    if (delta >= 1){
      this.isAnimating = false
      transform.position = new Point(nextPt.x, nextPt.y)
    }
    else {
      let tweenDelta = Tween.easeInOut(delta)
      let x = prevPt.x + tweenDelta * (nextPt.x - prevPt.x)
      let y = prevPt.y + tweenDelta * (nextPt.y - prevPt.y)
      transform.position = new Point(x, y)
    }
  }
}

Entity.register(PositionAnim)

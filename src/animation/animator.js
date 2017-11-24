import { AnimationType as Type } from './animation-type'
import { TweenInvoker } from '../utils'

/**
 * provides functinality to animate sprite
 * 
 * @export
 * @class Animator
 */
export class Animator {
  /**
   * Creates an instance of Animator.
   * @memberof Animator
   */
  constructor (){

  }

  /**
   * tick animation
   * 
   * @memberof Animator
   */
  tick (){
    TweenInvoker.update()
  }

  /**
   * start an animation
   * 
   * @param {function} assign function to assign value
   * @param {number} dur duration
   * @param {string} type type of animation
   * @returns {Promise}
   * @memberof Animator
   */
  animate (assign, dur, type){
    return TweenInvoker[type](dur, 0, 1, assign)
  }

  /**
   * start a move animation
   * 
   * @param {Entity} spr sprite
   * @param {Point} pos position
   * @param {number} dur duration
   * @param {string} [type=Type.LINEAR] type of animation
   * @returns {Promise}
   * @memberof Animator
   */
  moveTo (spr, pos, dur, type = Type.LINEAR){
    let startX = spr.position.x
    let startY = spr.position.y

    let deltX = pos.x - startX
    let deltY = pos.y - startY

    let assign = (val) => {
      spr.position.x = startX + val * deltX
      spr.position.y = startY + val * deltY
    }

    return this.animate(assign, dur, type)
  }

  /**
   * start a fade animation
   * 
   * @param {Entity} spr sprite
   * @param {number} opa opacity 
   * @param {number} dur duration
   * @param {string} [type=Type.LINEAR] type of animation
   * @returns {Promise}
   * @memberof Animator
   */
  fadeTo (spr, opa, dur, type = Type.LINEAR){
    let start = spr.opacity
    let delt = opa - start
    let assign = (val) => spr.opacity = start + val * delt
    return this.animate(assign, dur, type)
  }

  /**
   * start a rotate animation
   * 
   * @param {Entity} spr sprite
   * @param {number} rotation rotation 
   * @param {number} dur duration
   * @param {string} [type=Type.LINEAR] type of animation
   * @returns {Promise}
   * @memberof Animator
   */
  rotateTo (spr, rotation, dur, type = Type.LINEAR){
    let start = spr.rotation
    let delt = rotation - start
    let assign = (val) => spr.rotation = start + val * delt
    return this.animate(assign, dur, type)
  }

  /**
   * start a scale animation
   * 
   * @param {Entity} spr sprite
   * @param {number} scale scale 
   * @param {number} dur duration
   * @param {string} [type=Type.LINEAR] type of animation
   * @returns {Promise}
   * @memberof Animator
   */
  scaleTo (spr, scale, dur, type = Type.LINEAR){
    let startX = spr.scale.x
    let startY = spr.scale.y

    let deltX = scale.x - startX
    let deltY = scale.y - startY

    let assign = (val) => {
      spr.scale.x = startX + val * deltX
      spr.scale.y = startY + val * deltY
    }

    return this.animate(assign, dur, type)
  }
}

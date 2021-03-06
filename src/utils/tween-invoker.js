import { Tween } from './tween'

/**
 * Provides functionality to tween a single attribute.
 * @private
 */
class TweenFunc {
  /**
   * @param {function} tween function of tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @param {function} cb callback after completed
   */
  constructor (tween, dur, begin, end, assign, cb){
    this._isDone = false

    this._tween = tween
    this._dur = dur
    this._begin = begin
    this._end = end
    this._assign = assign
    this._cb = cb

    this._beginTime = new Date()
    this._deltaVal = end - begin
  }

  /**
   * update current tween function
   * @return {TweenFunc} return this
   */
  update (){
    let elapsedTime = new Date() - this._beginTime
    let elapsedRatio = elapsedTime / this._dur

    if (elapsedRatio >= 1){
      this._assign(this._end)
      this._isDone = true
      this._cb()
    }
    else {
      let tweenedRatio = this._tween(elapsedRatio)
      let curVal = this._begin + this._deltaVal * tweenedRatio
      this._assign(curVal)
    }

    return this
  }

  /**
   * whether current tween is done
   * @return {bool}
   */
  isDone (){
    return this._isDone
  }
}

// store all TweenFunc instances
const tweenFuncs = new Set()

/**
 * Provides functionality to automatically invoke tween.
 * @example
 * import { TweenInvoker } from './src/utils'
 *
 * setInterval(()=> TweenInvoker.update(), 66)
 * TweenInvoker.linear(500, 0, 1, (val)=> log(val))
 *   .then(()=> log('done'))
 */
export class TweenInvoker {
  /**
   * invoke this method per frame to update tween.
   */
  static update (){
    for (let func of tweenFuncs){
      if (func.update().isDone()){
        tweenFuncs.delete(func)
      }
    }
  }

  /**
   * launch a linear tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static linear (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.linear, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a ease in tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static easeIn (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.easeIn, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a ease out tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static easeOut (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.easeOut, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a ease in and out tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static easeInOut (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.easeInOut, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a cubic in tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static cubicIn (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.cubicIn, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a cubic out tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static cubicOut (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.cubicOut, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a cubic in and out tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static cubicInOut (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.cubicInOut, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a quartic in tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static quarticIn (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.quarticIn, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a quartic out tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static quarticOut (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.quarticOut, dur, begin, end, assign, resolve))
    })
  }

  /**
   * launch a quartic in and out tween
   * @param {number} dur duration of tween
   * @param {number} begin begin value of tween
   * @param {number} end end value of tween
   * @param {function} assign function to assign tweened value
   * @return {Promise} on tween end
   */
  static quarticInOut (dur, begin, end, assign){
    return new Promise((resolve)=>{
      tweenFuncs.add(new TweenFunc(Tween.quarticInOut, dur, begin, end, assign, resolve))
    })
  }
}

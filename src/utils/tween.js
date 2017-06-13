/**
 * validate input value, must in [0, 1]
 * @private
 * @param {number} v input value
 */
const validate = function (v){
  if (v < 0 || v > 1){
    throw new Error('Tween: value out of range [0, 1].')
  }
}

/**
 * calc a tween-in value using func
 * @private
 * @param {number} v input value
 * @param {function} func tween function
 * @return {number} tweened value
 */
const tweenIn = function (v, func){
  return func(v)
}

/**
 * calc a tween-out value using func
 * @private
 * @param {number} v input value
 * @param {function} func tween function
 * @return {number} tweened value
 */
const tweenOut = function (v, func){
  return 1 - func(1 - v)
}

/**
 * calc a tween-in-out value using func
 * @private
 * @param {number} v input value
 * @param {function} func tween function
 * @return {number} tweened value
 */
const tweenInOut = function (v, func){
  if (v < 0.5){
    return func(v * 2) / 2
  }
  else {
    return 1 - (func((1 - v) * 2) / 2)
  }
}

const square = (v)=> v * v
const cubic = (v)=> v * v * v
const quartic = (v)=> v * v * v * v

/**
 * Provides functionaliry to tween value.
 */
export class Tween{
  /**
   * tween using linear
   * @param {number} v input value
   * @return {number} tweened value
   */
  static linear (v){
    validate(v)
    return v
  }

  /**
   * tween in using square
   * @param {number} v input value
   * @return {number} tweened value
   */
  static easeIn (v){
    validate(v)
    return tweenIn(v, square)
  }

  /**
   * tween out using square
   * @param {number} v input value
   * @return {number} tweened value
   */
  static easeOut (v){
    validate(v)
    return tweenOut(v, square)
  }

  /**
   * tween in and out using square
   * @param {number} v input value
   * @return {number} tweened value
   */
  static easeInOut (v){
    validate(v)
    return tweenInOut(v, square)
  }

  /**
   * tween in using cubic
   * @param {number} v input value
   * @return {number} tweened value
   */
  static cubicIn (v){
    validate(v)
    return tweenIn(v, cubic)
  }

  /**
   * tween out using cubic
   * @param {number} v input value
   * @return {number} tweened value
   */
  static cubicOut (v){
    validate(v)
    return tweenOut(v, cubic)
  }

  /**
   * tween in and out using cubic
   * @param {number} v input value
   * @return {number} tweened value
   */
  static cubicInOut (v){
    validate(v)
    return tweenInOut(v, cubic)
  }

  /**
   * tween in using quartic
   * @param {number} v input value
   * @return {number} tweened value
   */
  static quarticIn (v){
    validate(v)
    return tweenIn(v, quartic)
  }

  /**
   * tween out using quartic
   * @param {number} v input value
   * @return {number} tweened value
   */
  static quarticOut (v){
    validate(v)
    return tweenOut(v, quartic)
  }

  /**
   * tween in and out using quartic
   * @param {number} v input value
   * @return {number} tweened value
   */
  static quarticInOut (v){
    validate(v)
    return tweenInOut(v, quartic)
  }
}

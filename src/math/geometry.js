/**
 * Useful geometries
 * @file geometry.js
 * @author yewmint
 */

/**
 * Rectangle Object
 */
export class Rect {
  /**
   * @param {number} bx x of begin point
   * @param {number} by y of begin point
   * @param {number} ex x of end point
   * @param {number} ey y of end point
   */
  constructor (bx, by, ex, ey){
    /**
     * x of begin point
     * @type {number} bx
     */
    this.bx = bx

    /**
     * x of begin point
     * @type {number} by
     */
    this.by = by

    /**
     * x of end point
     * @type {number} ex
     */
    this.ex = ex

    /**
     * y of end point
     * @type {number} ey
     */
    this.ey = ey
  }

  /**
   * get a rectangle of (0, 0) to (1, 1)
   * @return {Rect}
   */
  static one (){
    return new Rect(0, 0, 1, 1)
  }
}

/**
 * Point Object
 */
export class Point {
  /**
   * get origin point
   * @return {Point}
   */
  static origin (){
    return new Point(0, 0)
  }

  /**
   * get unit point
   * @return {Point}
   */
  static one (){
    return new Point(1, 1)
  }

  /**
   * @param {number} x x axis
   * @param {number} x x axis
   */
  constructor (x, y){
    /**
     * x axis
     * @private
     * @type {number} x
     */
    this._x = x

    /**
     * y axis
     * @private
     * @type {number} y
     */
    this._y = y

    /**
     * callback when modifed
     * @private
     * @type {function} _cb
     */
    this._cb = null
  }

  /**
  * set callback when modifed
  * @param {function} cb
  */
  onChange (cb){
    this._cb = cb
  }

  /**
  * invoke callback
  * @private
  */
  _invokeCb (){
    if (this._cb){
      this._cb()
    }
  }

  /**
  * get x
  */
  get x(){
    return this._x
  }

  /**
  * set x
  */
  set x(val){
    this._x = val
    this._invokeCb()
  }

  /**
  * get y
  */
  get y(){
    return this._y
  }

  /**
  * set y
  */
  set y(val){
    this._y = val
    this._invokeCb()
  }

  get data (){
    return {
      x: this.x,
      y: this.y
    }
  }

  set data ({x, y}){
    this._x = x
    this._y = y
  }

  /**
   * add 2 points
   * @param {Point} pt another point
   * @return {Point}
   */
  add (pt){
    return new Point(this.x + pt.x, this.y + pt.y)
  }
}

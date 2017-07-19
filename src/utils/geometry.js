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
    return new Point(0, 1)
  }

  /**
   * @param {number} x x axis
   * @param {number} x x axis
   */
  constructor (x, y){
    /**
     * x axis
     * @type {number} x
     */
    this.x = x

    /**
     * y axis
     * @type {number} y
     */
    this.y = y
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

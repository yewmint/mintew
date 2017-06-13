/**
 * Provides a triangle area, where webgl can paint a pure color
 * @example
 * let tri = webgl.triangle()
 * tri.pos(0, 0, 0)
 * tri.pos(1, 200, 400)
 * tri.pos(2, 200, 0)
 * 
 * webgl.color([1.0, 0.6, 0.6, 0.8])
 * webgl.drawTriangle(tri)
 */
export class Triangle{
  /**
   * @param {WebGLRenderingContext} gl webgl context of canvas
   */
  constructor (gl){
    /**
     * @private
     * @type {WebGLRenderingContext} _gl
     */
    this._gl = gl

    /**
     * @private
     * @type {WebGLBuffer} _vbo vbo
     */
    this._vbo = gl.createBuffer()

    /**
     * @private
     * @type {number[]} _data vertex data
     */
    this._data = new Array(3 * 4).fill(0.0)
  }

  /**
   * set position for point
   * @param {number} idx index of point, must in [0, 1, 2]
   * @param {number} x x position of point
   * @param {number} y y position of point
   */
  pos (idx, x, y){
    this._data[idx * 4 + 0] = x
    this._data[idx * 4 + 1] = y
    this._flush()
  }

  /**
   * flush data of triangle into gpu
   * @private
   */
  _flush (){
    let gl = this._gl
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._data), gl.DYNAMIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }
}

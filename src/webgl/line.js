/**
 * Provides a line graphic, where webgl can paint a line
 * @example
 * let line = webgl.line()
 * line.begin(0, 0)
 * line.end(200, 200)
 * 
 * webgl.color([1.0, 1.0, 0.0, 1.0])
 * webgl.drawLine(line)
 */
export class Line{
  /**
   * @param {WebGLRenderingContext} gl webgl context of canvas
   */
  constructor (gl){

    /**
     * @private
     * @type {WebGLRenderingContext}
     */
    this._gl = gl

    /**
     * @private
     * @type {WebGLBuffer}
     */
    this._vbo = gl.createBuffer()

    /**
     * @private
     * @type {number[]}
     */
    this._data = new Array(2 * 4).fill(0.0)
  }

  /**
   * set begin position of line
   * @param {number} x x position of begin point
   * @param {number} y y position of begin point
   */
  begin (x, y){
    this._data[0] = x
    this._data[1] = y
    this._flush()
  }

  /**
   * set end position of line
   * @param {number} x x position of end point
   * @param {number} y y position of end point
   */
  end (x, y){
    this._data[4 + 0] = x
    this._data[4 + 1] = y
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

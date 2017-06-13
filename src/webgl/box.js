/**
 * Provides a box area, where webgl can paint
 * @example
 * let tex = webgl.loadTexture(img)
 * webgl.texture(tex)
 *
 * let box = webgl.box()
 * box.size(512, 512)
 * box.uv(0, 0, 1, 1)
 * 
 * webgl.drawBox(box)
 */
export class Box{
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
    this._data = new Array(4 * 4).fill(0.0)
  }

  /**
   * set size of box
   * @param {number} width width of box
   * @param {number} height height of box
   */
  size (width, height){
    this._data[4 * 1 + 0] = width
    this._data[4 * 3 + 0] = width
    this._data[4 * 3 + 1] = height
    this._data[4 * 2 + 1] = height
    this._flush()
  }

  /**
   * set rectangle of texture used by box
   * @param {number} bx begin x of box
   * @param {number} by begin y of box
   * @param {number} ex end x of box
   * @param {number} ey end y of box
   */
  uv (bx, by, ex, ey){
    by = 1 - by
    ey = 1 - ey
    this._data[4 * 0 + 2] = bx
    this._data[4 * 2 + 2] = bx
    this._data[4 * 0 + 3] = by
    this._data[4 * 1 + 3] = by
    this._data[4 * 1 + 2] = ex
    this._data[4 * 3 + 2] = ex
    this._data[4 * 2 + 3] = ey
    this._data[4 * 3 + 3] = ey
    this._flush()
  }

  /**
   * flush data of box into gpu
   * @private
   */
  _flush (){
    let gl = this._gl
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._data), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }
}

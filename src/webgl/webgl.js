import { Shader } from './shader'
import { CLEAR_COLOR } from './const'
import { Mat } from '../math'
import { Box } from './box'
import { Triangle } from './triangle'
import { Line } from './line.js'

const validateVbo = function (vbo){
  if (!vbo) {
    throw new Error('WebGL: unable to draw null vbo.')
  }
}

/**
 * WebGL provides simple way to handle webgl request.
 * @example
 * import { WebGL } from './src/webgl'
 *
 * webgl = new WebGL(canvas)
 * webgl.init()
 * webgl.clear()
 * webgl.view(1280, 720)
 * webgl.translate(0, 0)
 * webgl.rotate(0)
 * webgl.scale(1, 1)
 * webgl.pivot(0, 0)
 */
export class WebGL{
  /**
   * @param {Canvas} canvas canvas used to handle webgl
   */
  constructor (canvas){
    /**
     * @private
     * @type {Canvas} _gl
     */
    this._canvas = canvas

    /**
     * @private
     * @type {WebGLRenderingContext} _gl
     */
    this._gl = null

    /**
     * @private
     * @type {Shader} _shader
     */
    this._shader = null
  }

  /**
   * init context of canvas
   */
  init (){
    const canvas = this._canvas
    const gl = canvas.getContext('webgl')
    if (!gl) {
      throw new Error('Failed to get webgl context')
    }

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(...CLEAR_COLOR)
    this._gl = gl

    const shader = new Shader(gl)
    shader.init()
    this._shader = shader

    this._initAttrsAndUnifs()
  }

  /**
   * init all attributes and uniforms
   * @private
   */
  _initAttrsAndUnifs (){
    this.view(1280, 720)
    this.transform(Mat.eye(4, 1))
    this.color([0.0, 0.0, 0.0, 1.0])
  }

  /**
   * create a box used to paint texture
   * @return {Box} new box
   */
  box (){
    return new Box(this._gl)
  }

  /**
   * create a triangle used to paint color
   * @return {Triangle} new triangle
   */
  triangle (){
    return new Triangle(this._gl)
  }

  /**
   * create a line
   * @return {Line} new line
   */
  line (){
    return new Line(this._gl)
  }

  /**
   * create a texture from texture
   * @param {Image} img image of texture
   * @return {WebGLTexture}
   */
  loadTexture (img){
    const gl = this._gl
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.bindTexture(gl.TEXTURE_2D, null)
    return tex
  }

  /**
   * change view matrix of webgl
   * @param {number} width width of view
   * @param {number} height height of view
   */
  view (width, height){
    let viewMat = Mat.view(width, height)
    this._shader.view(viewMat.data)
  }

  /**
   * change transform matrix of webgl
   * @param {Mat} mat
   */
  transform (mat){
    this._shader.transform(mat.data)
  }

  /**
   * change current texture of webgl
   * @param {WebGLTexture} tex texture to be used
   */
  texture (tex){
    const gl = this._gl
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, tex)
  }

  /**
   * set color for painting graphics
   * @param {number[]} color color to pain
   */
  color (color){
    if (!color || color.length !== 4){
      throw new Error('WebGL: invalid color data.')
    }
    this._shader.setColor(color)
  }

  /**
   * set opacity for drawing box
   * @param {number} opacity
   */
  opacity (opa){
    this._shader.opacity(opa)
  }

  /**
   * clear all content on canvas
   */
  clear (){
    const gl = this._gl
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  /**
   * paint box on canvas
   * @param {Box} box box to be painted
   */
  drawBox (box){
    const gl = this._gl
    const shader = this._shader

    const vbo = box._vbo
    validateVbo(vbo)

    shader.setPaintGraph(false)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    shader.bindVao()
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }

  /**
   * paint color triangle on canvas
   * @param {Triangle} triangle triangle to be painted
   */
  drawTriangle (triangle){
    const gl = this._gl
    const shader = this._shader

    const vbo = triangle._vbo
    validateVbo(vbo)

    shader.setPaintGraph(true)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    shader.bindVao()
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }

  /**
   * paint line on canvas
   * @param {Line} line line to be painted
   */
  drawLine (line){
    const gl = this._gl
    const shader = this._shader

    const vbo = line._vbo
    validateVbo(vbo)

    shader.setPaintGraph(true)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    shader.bindVao()
    gl.drawArrays(gl.LINE_STRIP, 0, 2)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }
}

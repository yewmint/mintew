import { readFileSync } from 'fs'
import { TextureProgram } from './shaders/texture-program'
import { GraphicProgram } from './shaders/graphic-program'

/**
 * Shader provides simple way to compile program for WebGL.
 * @private
 */
export class Shader {
  /**
   * @param {WebGLRenderingContext} gl webgl context of canvas
   */
  constructor (gl){
    /**
     * @type {WebGLRenderingContext}
     * @private
     */
    this._gl = gl

    /**
     * parogram to pain texture
     * @type {Program}
     */
    this._textureProgram = new TextureProgram(gl)

    /**
     * parogram to pain texture
     * @type {Program}
     */
    this._graphicProgram = new GraphicProgram(gl)
  }

  /**
   * init shaders and use program in webgl
   */
  init (){
    this._textureProgram.init()
    this._graphicProgram.init()
  }

  /**
   * upload view data into gpu
   * @param {number[]} data data of view matrix
   */
  view (data){
    this._textureProgram.uploadMatrix(data, 'view')
    this._graphicProgram.uploadMatrix(data, 'view')
  }

  /**
   * upload transform data into gpu
   * @param {number[]} data data of transform matrix
   */
  transform (data){
    this._textureProgram.uploadMatrix(data, 'transform')
    this._graphicProgram.uploadMatrix(data, 'transform')
  }

  /**
   * set color for painting graphics
   * @param {number[]} color color to pain
   */
  setColor (color){
    this._graphicProgram.setColor(color)
  }

  /**
   * set wheher paint graphics or not
   * @param {bool} isPaintGraph whether paint graphics or not
   */
  setPaintGraph (isPaintGraph){
    if (isPaintGraph){
      this._graphicProgram.use()
    }
    else {
      this._textureProgram.use()
    }
  }

  /**
   * set opacity for texture program
   * @param {number} opacity
   */
  opacity (opa){
    this._textureProgram.use()
    this._textureProgram.opacity(opa)
  }

  /**
   * bind vao
   */
  bindVao (){
    this._graphicProgram.bindVao()
    this._textureProgram.bindVao()
  }
}

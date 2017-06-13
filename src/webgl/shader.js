import { readFileSync } from 'fs'
import { TextureProgram } from './shaders/texture-program'
import { GraphicProgram } from './shaders/graphic-program'

/**
 * @private
 * Shader provides simple way to compile program for WebGL.
 */
export class Shader {
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
     * parogram to pain texture
     * @type {Program} _textureProgram
     */
    this._textureProgram = new TextureProgram(gl)

    /**
     * parogram to pain texture
     * @type {Program} _textureProgram
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
   * upload translate data into gpu
   * @param {number[]} data data of translate matrix
   */
  translate (data){
    this._textureProgram.uploadMatrix(data, 'translate')
  }

  /**
   * upload rotate data into gpu
   * @param {number[]} data data of rotate matrix
   */
  rotate (data){
    this._textureProgram.uploadMatrix(data, 'rotate')
  }

  /**
   * upload scale data into gpu
   * @param {number[]} data data of scale matrix
   */
  scale (data){
    this._textureProgram.uploadMatrix(data, 'scale')
  }

  /**
   * upload pivot data into gpu
   * @param {number[]} data data of pivot matrix
   */
  pivot (data){
    this._textureProgram.uploadMatrix(data, 'pivot')
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
   * bind vao
   */
  bindVao (){
    this._graphicProgram.bindVao()
    this._textureProgram.bindVao()
  }
}

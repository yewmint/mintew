import { readFileSync } from 'fs'
import { Program } from './program'

/**
 * Program used to paint graphic
 * @private
 */
export class GraphicProgram extends Program {
  /**
   * @param {WebGLRenderingContext} gl webgl context of canvas
   */
  constructor (gl){
    super(gl)
  }

  /**
   * init program
   * @override
   */
  init (){
    const vertSource = readFileSync('src/webgl/shaders/graphic.vert', 'utf8')
    this._source(vertSource, this._vert)

    const fragSource = readFileSync('src/webgl/shaders/graphic.frag', 'utf8')
    this._source(fragSource, this._frag)

    this._compile()

    this.use()
    this._enableAttr('vtxPos')
  }

  /**
   * bind vao
   * @override
   */
  bindVao (){
    const gl = this._gl
    const vtxLoc = this._attrLoc('vtxPos')
    gl.vertexAttribPointer(vtxLoc, 2, gl.FLOAT, false, 4 * 4, 0)
  }

  /**
   * set color for painting graphics
   * @param {number[]} color color to pain
   */
  setColor (color){
    this.use()
    const gl = this._gl
    const loc = this._unifLoc('color')
    gl.uniform4fv(loc, new Float32Array(color))
  }
}

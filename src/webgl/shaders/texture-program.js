import { Program } from './program'
import vert from './texture.vert'
import frag from './texture.frag'

/**
 * Program used to paint texture
 * @private
 */
export class TextureProgram extends Program {
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
    this._source(vert, this._vert)
    this._source(frag, this._frag)

    this._compile()
    this.use()
    this._enableAttr('vtxPos')
    this._enableAttr('atexCod')

    const gl = this._gl
    const samplerLoc = gl.getUniformLocation(this._program, 'uSampler')
    gl.uniform1i(samplerLoc, 0)

    this.opacity(1)
  }

  /**
   * set opacity
   * @param {number} opacity
   */
  opacity (opa){
    const loc = this._unifLoc('opacity')
    this._gl.uniform1f(loc, opa)
  }

  /**
   * bind vao
   * @override
   */
  bindVao (){
    const gl = this._gl
    const vtxLoc = this._attrLoc('vtxPos')
    const texLoc = this._attrLoc('atexCod')
    gl.vertexAttribPointer(vtxLoc, 2, gl.FLOAT, false, 4 * 4, 0)
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 4 * 4, 2 * 4)
  }
}

import { readFileSync } from 'fs'
import { Program } from './program'

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
    const vertSource = readFileSync('src/webgl/shaders/texture.vert', 'utf8')
    this._source(vertSource, this._vert)

    const fragSource = readFileSync('src/webgl/shaders/texture.frag', 'utf8')
    this._source(fragSource, this._frag)

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

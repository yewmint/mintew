/**
 * A abstract class for opengl program
 * @private
 */
export class Program {
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
     * @type {WebGLProgram} _program
     */
    this._program = gl.createProgram()

    /**
     * @private
     * @type {WebGLShader} _vert for vertex shader
     */
    this._vert = gl.createShader(gl.VERTEX_SHADER)

    /**
     * @private
     * @type {WebGLShader} _frag for fragment shader
     */
    this._frag = gl.createShader(gl.FRAGMENT_SHADER)

    /**
     * @private
     * @type {Map} _locs map from name to unifrom location
     */
    this._unifLocs = new Map()

    /**
     * @private
     * @type {Map} _locs map from name to attribute location
     */
    this._attrLocs = new Map()
  }

  /**
   * use current program in opengl
   */
  use (){
    this._gl.useProgram(this._program)
  }

  /**
   * abstract method to init program
   * @abstract
   */
  init (){ throw new Error('Program: must override this method.') }

  /**
   * abstract method to bind vao
   * @abstract
   */
  bindVao (){ throw new Error('Program: must override this method.') }

  /**
   * upload shader source to program
   * @private
   * @param {string} source shader source
   * @param {WebGLShader} shader shader to use
   */
  _source (source, shader){
    const gl = this._gl
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      let info = gl.getShaderInfoLog(shader)
      throw new Error(`Failed to compile shader: ${info}`)
    }
  }

  /**
   * compile and use program
   * @private
   */
  _compile (){
    const gl = this._gl
    const vert = this._vert
    const frag = this._frag
    const program = this._program

    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      let info = gl.getProgramInfoLog(program)
      throw new Error(`Failed to compile program: ${info}`)
    }
  }

  /**
   * enable attrs in shaders
   * @private
   */
  _enableAttr (name){
    const gl = this._gl
    const program = this._program

    const vtxLoc = this._attrLoc(name)
    gl.enableVertexAttribArray(vtxLoc)
  }

  /**
   * get location of attribute
   * @private
   * @param {string} name name of target location
   */
  _attrLoc (name){
    const locs = this._attrLocs
    if (!locs.has(name)){
      const loc = this._gl.getAttribLocation(this._program, name)
      locs.set(name, loc)
    }
    return locs.get(name)
  }

  /**
   * get location of uniform
   * @private
   * @param {string} name name of target location
   */
  _unifLoc (name){
    const locs = this._unifLocs
    if (!locs.has(name)){
      const loc = this._gl.getUniformLocation(this._program, name)
      locs.set(name, loc)
    }
    return locs.get(name)
  }

  /**
   * upload generic data into gpu
   * @param {number[]} data data of generic matrix
   * @param {string} locName name of target location
   */
  uploadMatrix (data, name){
    this.use()
    const loc = this._unifLoc(name)
    this._gl.uniformMatrix4fv(loc, false, new Float32Array(data))
  }
}

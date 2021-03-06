import { Renderer } from './renderer'
import { Mat, Rect, Point } from '../math'

/**
 * render texture on screen
 * 
 * @export
 * @class TextureRenderer
 * @extends {Renderer}
 */
export class TextureRenderer extends Renderer{
  /**
   * return name of component
   * 
   * @static
   * @return {string}
   * @memberof TextureRenderer
   */
  static name (){
    return 'texture-renderer'
  }

  /**
  * @param {WebGL} webgl
  * @param {Texture} texture
  */
  constructor (entity, webgl){
    super(entity)

    /**
     * box for renderer
     * @private
     * @type {Box}
     */
    this._box = webgl.box()

    /**
    * uv for renderer
    * can not be modifed
    * @private
    * @type {Rect}
    */
    this._uv = Rect.one()

    /**
     * texture of renderer
     * @private
     * @type {Texture}
     */
    this._texture = null

    /**
    * width of renderer
    * @private
    * @type {number}
    */
    this._width = 0

    /**
    * height of renderer
    * @private
    * @type {number}
    */
    this._height = 0

    // this._updateSize()
    // this._updateBox()
  }

  /**
  * udpate box data
  */
  _updateBox (){
    let tex = this._texture
    let uv = this._uv
    let box = this._box

    let bpt = tex.convCoord(uv.bx, uv.by)
    let ept = tex.convCoord(uv.ex, uv.ey)

    box.size(this.width, this.height)
    box.uv(bpt.x, bpt.y, ept.x, ept.y)
  }

  /**
   * update size of current renderer
   * 
   * @memberof TextureRenderer
   */
  _updateSize (){
    let uv = this.uv
    let texture = this._texture
    this._width = texture.width * (uv.ex - uv.bx)
    this._height = texture.height * (uv.ey - uv.by)
  }

  /**
  * width of renderer
  * @return {number}
  */
  get width (){
    return this._width
  }

  /**
  * height of renderer
  * @return {number}
  */
  get height (){
    return this._height
  }

  /**
  * texture of renderer
  * @return {Texture}
  */
  get texture (){
    return this._texture
  }

  /**
  * texture of renderer
  * @param {Texture} val
  */
  set texture (val){
    this._texture = val
    this._updateSize()
    this._updateBox()
  }

  /**
  * uv of texture
  * @return {Rect}
  */
  get uv (){
    return this._uv
  }

  /**
  * uv of texture
  * @param {Rect} val
  */
  set uv (val){
    this.uv = val
    this._updateSize()
    this._updateBox()
  }

  /**
  * render texture on screen
  */
  render (webgl){
    super.render(webgl)
    this.texture.bind()
    webgl.drawBox(this._box)
  }

  /**
  * update current component
  * @param {Context} context
  */
  update (ctx){
    super.update(ctx)
  }
}

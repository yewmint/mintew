import { TextureRenderer } from '../renderer'
import { TextTexture } from '../video'
import { Context } from '../framework'
import { Entity } from '../framework/entity.js'

/**
 * Provides functionality to render text on screen.
 * 
 * @export
 * @class Text
 * @extends {TextureRenderer}
 */
export class Text extends TextureRenderer {
  /**
   * return name of component
   * 
   * @static
   * @returns {string}
   * @memberof Text
   */
  static name (){
    return 'text'
  }

  /**
   * Creates an instance of Text.
   * @param {Entity} entity 
   * @param {string} text 
   * @memberof Text
   */
  constructor (entity, text){
    let webgl = Context.get('webgl')

    super(entity, webgl)

    /**
     * @type {WebGL}
     */
    this._webgl = webgl

    /**
     * @type {string}
     */
    this._text = text
    
    /**
     * @type {Object}
     */
    this._option = {
      size: 20,
      font: 'serif',
      fontType: '',
      color: 'black',
      width: 100
    }
    
    this._createTexture()
  }

  /**
   * get text
   * 
   * @memberof Text
   */
  get text (){
    return this._text
  }

  /**
   * set text and regenerate text texture
   * 
   * @memberof Text
   */
  set text (val){
    this._text = val
    this._createTexture()
  }

  /**
   * get width of text
   * 
   * @readonly
   * @memberof Text
   */
  get width (){
    return this.texture.width
  }
  
  /**
   * get height of text
   * 
   * @readonly
   * @memberof Text
   */
  get height (){
    return this.texture.height
  }

  /**
   * set option for text rendering
   * 
   * @param {any} key 
   * @param {any} val 
   * @memberof Text
   */
  setOption (key, val){
    this._option[key] = val
    this._createTexture()
  }

  /**
   * get option of text rendering
   * 
   * @param {any} key 
   * @returns {string}
   * @memberof Text
   */
  getOption (key){
    return this._option[key]
  }

  /**
   * create text texture
   * 
   * @private
   * @memberof Text
   */
  _createTexture (){
    if (this.texture){
      this.texture.release()
    }
    this.texture = new TextTexture(this._text, this._webgl, this._option)
  }

  /**
   * release text texture
   * 
   * @memberof Text
   */
  release (){
    super.release()
    this.texture.release()
  }
}

Entity.register(Text)
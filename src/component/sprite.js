import { TextureRenderer } from '../renderer'
import { Context } from '../framework'
import { Entity } from '../framework/entity.js'

/**
 * Provides functionality to render texture on screen.
 * 
 * @export
 * @class Sprite
 * @extends {TextureRenderer}
 */
export class Sprite extends TextureRenderer {
  /**
   * return name of component
   * 
   * @static
   * @returns {string}
   * @memberof Sprite
   */
  static name (){
    return 'sprite'
  }

  /**
   * Creates an instance of Sprite.
   * @param {Entity} entity 
   * @param {string} imageName 
   * @memberof Sprite
   */
  constructor (entity, imageName){
    super(entity, Context.get('webgl'))
    this._imageName = imageName
    this._loadSprite()
  }

  /**
   * return image name
   * 
   * @memberof Sprite
   */
  get imageName (){
    return this._imageName
  }

  /**
   * set image name and load sprite from resource
   * 
   * @memberof Sprite
   */
  set imageName (val){
    this._imageName = val
    this._loadSprite()
  }

  /**
   * load sprite from resource.
   * @private
   * @memberof Sprite
   */
  _loadSprite (){
    this.texture = Context.get('resource').texture(this._imageName)
  }
}

Entity.register(Sprite)

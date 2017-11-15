import { TextureRenderer } from '../renderer'
import { Context } from '../framework'
import { Entity } from '../framework/entity.js'

export class Sprite extends TextureRenderer {
  static name (){
    return 'sprite'
  }

  constructor (entity, imageName){
    super(entity, Context.get('webgl'))
    this._imageName = imageName
    this._loadSprite()
  }

  get imageName (){
    return this._imageName
  }

  set imageName (val){
    this._imageName = val
    this._loadSprite()
  }

  _loadSprite (){
    this.texture = Context.get('resource').texture(this._imageName)
  }
}

Entity.register(Sprite)

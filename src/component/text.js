import { TextureRenderer } from '../renderer'
import { TextTexture } from '../video'
import { Context } from '../framework'
import { Entity } from '../framework/entity.js'

export class Text extends TextureRenderer {
  static name (){
    return 'text'
  }

  constructor (entity, text){
    let webgl = Context.get('webgl')

    super(entity, webgl)
    this._webgl = webgl
    this._text = text
    this._option = {
      size: 20,
      font: 'serif',
      fontType: '',
      color: 'black',
      width: 100
    }
    this._createTexture()
  }

  get text (){
    return this._text
  }

  set text (val){
    this._text = val
    this._createTexture()
  }

  get width (){
    return this.texture.width
  }
  
  get height (){
    return this.texture.height
  }

  setOption (key, val){
    this._option[key] = val
    this._createTexture()
  }

  getOption (key){
    return this._option[key]
  }

  _createTexture (){
    if (this.texture){
      this.texture.release()
    }
    this.texture = new TextTexture(this._text, this._webgl, this._option)
  }

  release (){
    this.texture.release()
  }
}

Entity.register(Text)
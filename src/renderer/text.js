import { TextureRenderer } from './texture-renderer'
import { TextTexture } from '../video'

export class Text extends TextureRenderer {
  static name (){
    return 'text'
  }

  static create (entity, ctx, ...args){
    return new Text(entity, ctx.webgl, ...args)
  }

  constructor (entity, webgl, text){
    super(entity, webgl)
    this._webgl = webgl
    this._text = text
    this.option = {
      size: 20,
      font: 'arial',
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

  _createTexture (){
    this.texture.release()
    this.texture = new TextTexture(this._text, this._webgl, this.option)
  }

  release (){
    this.texture.release()
  }
}

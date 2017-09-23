import { SoundLoader } from '../sound'
import { TextureLoader } from '../video'
import { Func } from '../utils'

const textureDir = './image/'
const soundDir = './audio/'

const textureExts = ['png', 'jpg']
const soundExts = ['mp3', 'ogg', 'wav']

export class Resource {
  constructor (){
    this._textures = null
    this._sound = null
  }

  async load (list, webgl){
    let soundLoader = new SoundLoader
    let textureLoader = new TextureLoader(webgl)

    for (let ele of list){
      if (Func.oneOf(Func.extname(ele), textureExts)){
        textureLoader.push(textureDir + ele)
      }
      else if (Func.oneOf(Func.extname(ele), soundExts)){
        soundLoader.push(soundDir + ele)
      }
    }

    this._textures = await textureLoader.load()
    this._sound = await soundLoader.load()
  }

  texture (name){
    return this._textures.get(name)
  }

  source (name){
    return this._sound.get(name)
  }
}

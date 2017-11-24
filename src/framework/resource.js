import { SoundLoader } from '../sound'
import { TextureLoader } from '../video'
import { Func } from '../utils'

const textureDir = './image/'
const soundDir = './audio/'

const textureExts = ['png', 'jpg']
const soundExts = ['mp3', 'ogg', 'wav']

/**
 * Manage resource.
 * 
 * @export
 * @class Resource
 */
export class Resource {
  /**
   * Creates an instance of Resource.
   * @memberof Resource
   */
  constructor (){
    this._textures = null
    this._sound = null
  }

  /**
   * load reources asynchronously
   * 
   * @param {string[]} list uris
   * @param {WebGL} webgl webgl that texture attached to
   * @memberof Resource
   */
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

  /**
   * get texture by name
   * 
   * @param {string} name 
   * @returns {Texture}
   * @memberof Resource
   */
  texture (name){
    return this._textures.get(name)
  }

  /**
   * get audio source by name
   * 
   * @param {string} name 
   * @returns {Source}
   * @memberof Resource
   */
  source (name){
    return this._sound.get(name)
  }
}

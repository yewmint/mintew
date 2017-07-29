/**
* @author yewmint
*/

import { Func } from '../utils'
import { Texture } from './texture'

/**
 * TextureLoader provides functionality to pre-load texture.
 */
class TextureLoader {
  /**
   *
   */
  constructor (){
    /**
     * @private
     * @type {Set} _queue pre-load queue
     */
    this._queue = new Set

    /**
     * @private
     * @type {Map} _textures loaded textures
     */
    this._textures = new Map
  }

  /**
   * push url to pre-load queue
   * @param {stirng} url url of texture
   */
  push (url){
    this._queue.add(url)
  }

  /**
   * load all textures in queue
   * @return {Promise} return loaded Sound object
   */
  load (){
    const loadTexture = (resolve)=> {
      for (let url of this._queue){
        let img = document.createElement("img")
        img.src = url

        img.onload = ()=> {
          let name = Func.name(url)
          this._textures.set(name, new Texture(img))

          if (this._textures.size == this._queue.size){
            resolve(this._sources)
          }
        }

        img.onerror = ()=> {
          throw new Error('ERROR: TextureLoader failed to load ' + url)
        }
      }
    }

    return new Promise(loadTexture)
  }
}

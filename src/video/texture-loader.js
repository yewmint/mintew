/**
* @author yewmint
*/

import { Func } from '../utils'
import { ImageTexture } from './image-texture'

/**
 * TextureLoader provides functionality to pre-load texture.
 */
export class TextureLoader {
  /**
   * @param {WebGL} webgl
   */
  constructor (webgl){
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

    /**
    * @private
    * @type {WebGL} _webgl
    */
    this._webgl = webgl
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
    if (this._queue.size === 0){
      return
    }

    const loadTexture = (resolve)=> {
      if (this._queue.size === 0){
        resolve(new Map)
        return
      }

      for (let url of this._queue){
        let img = document.createElement("img")
        img.src = url

        img.onload = ()=> {
          let name = Func.name(url)
          this._textures.set(name, new ImageTexture(img, this._webgl))

          if (this._textures.size == this._queue.size){
            resolve(this._textures)
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

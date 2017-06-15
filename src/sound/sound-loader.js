import { Sound } from './sound'
import { Source } from './source'
import { Func } from '../utils'

/**
 * Provides functionality to prr-load all audios
 * @example
 * import { SoundLoader } from './sound'
 * 
 * SoundLoader.push('path/to/music.ogg')
 * let sound = await SoundLoader.load()
 */
export class SoundLoader {
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
     * @type {Map} _sources loaded sources
     */
    this._sources = new Map
  }

  /**
   * push url to pre-load queue
   * @param {stirng} url url of audio
   */
  push (url){
    this._queue.add(url)
  }

  /**
   * load all audios in queue
   * @return {Promise} return loaded Sound object
   */
  load (){
    const loadAudio = (resolve)=> {
      for (let url of this._queue){
        let audio = document.createElement("audio")
        audio.src = url
        audio.oncanplaythrough = ()=> {
          let name = Func.name(url)
          this._sources.set(name, new Source(audio))

          if (this._sources.size == this._queue.size){
            resolve(new Sound(this._sources))
          }
        }
      }
    }

    return new Promise(loadAudio)
  }
}

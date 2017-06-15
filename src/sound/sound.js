import { Source } from './source'

/**
 * Provides functionality to manage loaded sound sources,
 * constructed by SoundLoader
 * @example
 * sound = await SoundLoader.load()
 * sound.mute()
 * let source = sound.get('music name')
 */
export class Sound {
  /**
   * @private
   */
  constructor (sources){
    /**
     * @private
     * @type {Map} _sources all loaded sources
     */
    this._sources = sources

    /**
     * @private
     * @type {number} _volumn main volumn
     */
    this._volumn = 1
  }

  /**
   * get source by its name
   * @param {string} name name of source
   * @return {Source}
   */
  get (name){
    return this._sources.get(name)
  }

  /**
   * mute all sources in this sound
   */
  mute (){
    this.volumn = 0
  }

  /**
   * stop all sources in this sound
   */
  stop (){
    this._each((src)=> src.stop())
  }

  /**
   * get main volumn
   */
  get volumn (){
    return this._volumn
  }

  /**
   * adjust main volumn
   * @param {number} val volumn
   */
  set volumn (val){
    this._volumn = val
    this._each((src)=> {
      src.setMainVolumn(this._volumn)
    })
  }

  /**
   * invoker function to each source
   * @private
   * @param {fucntion} fn function
   */
  _each (fn){
    for (let [key, source] of this._sources){
      fn(source)
    }
  }
}

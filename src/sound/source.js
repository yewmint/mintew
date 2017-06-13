import { TweenInvoker } from '../utils'

/**
 * Audio Source provides functionality to operate single audio.
 */
export class Source {
  /**
   * @private
   * @param {Audio} audio loaded audio object
   * @param {Sound} sound sound object
   */
  constructor (audio, sound){
    super()

    /**
     * @private
     * @type {Audio} _audio loaded audio object
     */
    this._audio = audio

    /**
     * @private
     * @type {Sound} sound sound object
     */
    this._sound = sound

    /**
     * @private
     * @type {number} _volumn volumn of source
     */
    this._volumn = 1
  }

  /**
   * play current audio
   */
  play (){
    this._audio.play()
  }

  /**
   * pause current audio
   */
  pause (){
    this._audio.pause()
  }

  /**
   * stop current audio
   */
  stop (){
    this._audio.currentTime = 0
    this.pause()
  }

  /**
   * whether loop current source
   * @return {bool} loop
   */
  get loop (){
    return this._audio.loop
  }

  /**
   * whether loop current source
   * @param {bool} val
   */
  set loop (val){
    this._audio.loop = val
  }

  /**
   * volumn of current source
   * @return {number} volumn
   */
  get volumn (){
    return this._volumn
  }

  /**
   * volumn of current source
   * @param {number} val volumn
   */
  set volumn (val){
    if (val < 0 || val > 1) {
      throw new Error('Source: volumn out of range.')
    }

    this._volumn = val
    this._audio.volumn = val * this._sound.volumn
  }

  /**
   * launch a volumn fade in tween
   * @param {number} dt duration time of tween
   */
  fadeIn (dt){
    TweenInvoker.linear(dt, 0, 1, (val)=> this.volumn = val)
  }

  /**
   * launch a volumn fade out tween
   * @param {number} dt duration time of tween
   */
  fadeOut (dt){
    TweenInvoker.linear(dt, 1, 0, (val)=> this.volumn = val)
  }
}

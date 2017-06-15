import { TweenInvoker } from '../utils'

/**
 * Audio Source provides functionality to operate single audio.
 * @example
 * let source = sound.get('music name')
 * source.play()
 * source.volumn = 1
 * await source.fadeIn()
 */
export class Source {
  /**
   * @private
   * @param {Audio} audio loaded audio object
   */
  constructor (audio){
    /**
     * @private
     * @type {Audio} _audio loaded audio object
     */
    this._audio = audio

    /**
     * @private
     * @type {number} _volumn volumn of source
     */
    this._volumn = 1

    /**
     * @private
     * @type {number} _mainVolumn system main volumn
     */
    this._mainVolumn = 1

    // dump volumn into audio
    this._updateVolumn()
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
    this.pause()
    this._audio.currentTime = 0
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
    this._updateVolumn()
  }

  /**
   * set system main volumn
   * this could only be called by Sound
   * @private
   * @param {number} val main voilumn
   */
  setMainVolumn (val){
    this._mainVolumn = val
    this._updateVolumn()
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

  /**
   * update volumn of audio with volumn * main-volumn
   */
  _updateVolumn (){
    this._audio.volumn = this._volumn * this._mainVolumn
  }
}

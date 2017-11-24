import { Game, Context } from '../framework'
import * as DialogSlider from './dialog-slider'
import * as plot from './plots'
import '../component'

/**
 * Provides functionality to create game like Life Line
 * 
 * @export
 * @class LifeFrame
 */
export class LifeFrame {
  /**
   * Creates an instance of LifeFrame.
   * @memberof LifeFrame
   */
  constructor (){
    this.app = new Game('root', 480, 800)
    this._mode = 'dialog'
    plot.init()
  }

  /**
   * initialize app
   * 
   * @memberof LifeFrame
   */
  async _init(){
    let app = this.app

    await app.load([
      'bg.png',
      'normal-dialog.png',
      'question-dialog.png',
      'question-dialog-true.png',
      'question-dialog-false.png'
    ])

    let bg = app.entity()
    bg.attach('sprite', 'bg')
    app.root.addChild(bg)
    bg.attach('click', () => this._handleClick())
  
    let slider = DialogSlider.create(app)
    this.slider = slider
    app.root.addChild(slider)
  }
  
  /**
   * run application
   * 
   * @memberof LifeFrame
   */
  async run (){
    await this._init()
    this.app.run(async () => {})
    this._handleScript(plot.step())
  }

  /**
   * create a dialog
   * 
   * @param {string} text 
   * @memberof LifeFrame
   */
  dialog (text){
    this.slider.addDialog(text)
  }

  /**
   * create a question
   * 
   * @param {string} text 
   * @param {string} trueText 
   * @param {string} falseText 
   * @memberof LifeFrame
   */
  question (text, trueText, falseText){
    this.slider.addQuestion(
      text, 
      trueText, 
      falseText,
      isTrue => this._handleSelect(isTrue)
    )
  }

  /**
   * handle click event
   * 
   * @private
   * @memberof LifeFrame
   */
  _handleClick (){
    if (this._mode !== 'dialog'){
      return
    }
    
    setTimeout(() => {
      this._handleScript(plot.step())
    }, 0)
  }

  /**
   * handle select event
   * 
   * @private
   * @param {any} isTrue 
   * @memberof LifeFrame
   */
  _handleSelect (isTrue){
    setTimeout(() => {
      this._handleScript(plot.step(isTrue ? 1 : 2))
    }, 0)
  }

  /**
   * handle next script
   * 
   * @private
   * @param {any} script 
   * @memberof LifeFrame
   */
  _handleScript (script){
    this._mode = script.type
    if (this._mode === 'dialog'){
      this.dialog(script.text)
    }
    else {
      this.question(
        script.text,
        script.choiceTextA,
        script.choiceTextB
      )
    }
  }
}
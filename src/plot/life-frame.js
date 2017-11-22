import { Game, Context } from '../framework'
import * as DialogSlider from './dialog-slider'
import * as plot from './plots'
import '../component'

export class LifeFrame {
  constructor (){
    this.app = new Game('root', 480, 800)
    this._mode = 'dialog'
    plot.init()
  }

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
  
  async run (){
    await this._init()
    this.app.run(async () => {})
    this._handleScript(plot.step())
  }

  dialog (text){
    this.slider.addDialog(text)
  }

  question (text, trueText, falseText){
    this.slider.addQuestion(
      text, 
      trueText, 
      falseText,
      isTrue => this._handleSelect(isTrue)
    )
  }

  _handleClick (){
    if (this._mode !== 'dialog'){
      return
    }
    
    setTimeout(() => {
      this._handleScript(plot.step())
    }, 0)
  }

  _handleSelect (isTrue){
    setTimeout(() => {
      this._handleScript(plot.step(isTrue ? 1 : 2))
    }, 0)
  }

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
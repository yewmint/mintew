import { Game, Context } from '../framework'
import * as DialogSlider from './dialog-slider'
import '../component'

export class LifeFrame {
  constructor (){
    this.app = new Game('root', 480, 800)
    this._mode = 'dialog'
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
    bg.attach('click', ())
  
    let slider = DialogSlider.create(app)
    this.slider = slider

    app.root.addChild(slider)
  }
  
  async run (plot){
    await this._init()
    this.app.run(plot)
  }

  dialog (text){
    this.slider.addDialog(text)
  }

  question (){
    this.slider.addQuestion(text, trueText, falseText)
  }

  _handleClick (){
    if (this._mode === 'dialog'){
      
    }
  }

  _handleSelect (){

  }
}
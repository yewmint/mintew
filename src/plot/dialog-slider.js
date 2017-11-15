import * as Dialog from './dialog'
import * as Question from './question'

export function create(app){
  let slider = app.entity()

  slider.attach('position-anim')

  slider._dialogs = []

  slider._getHeight = function (){
    return this._dialogs.length * 140 + 20
  }

  slider._animate = function (){
    let anim = this['position-anim']
    anim.to(0, this._getHeight(), 500)
  }

  slider.addDialog = function (text){
    let dialog = Dialog.create(app, text)
    dialog.transform.position.y = -this._getHeight() - 140
    this.addChild(dialog)
    this._dialogs.push(dialog)
    this._animate()
  }
  
  slider.addQuestion = function (text, trueText, falseText, callback){
    let dialog = Question.create(app, text, trueText, falseText, callback)
    dialog.transform.position.y = -this._getHeight() - 140
    this.addChild(dialog)
    this._dialogs.push(dialog)
    this._animate()
  }

  return slider
}
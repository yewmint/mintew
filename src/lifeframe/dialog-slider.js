import * as Dialog from './dialog'
import * as Question from './question'

/**
 * create a slider,
 * which can slide upward.
 * 
 * @export
 * @param {Game} app 
 * @returns {Enitity}
 */
export function create(app){
  let slider = app.entity()

  slider.attach('position-anim')

  /**
   * store all dialogs
   */
  slider._dialogs = []

  /**
   * return height of current slider
   * @private
   */
  slider._getHeight = function (){
    return this._dialogs.length * 140 + 20
  }

  /**
   * start animation
   */
  slider._animate = function (){
    let anim = this['position-anim']
    anim.to(0, this._getHeight(), 500)
  }

  /**
   * add dialog
   * @param {string} text
   */
  slider.addDialog = function (text){
    let dialog = Dialog.create(app, text)
    dialog.transform.position.y = -this._getHeight() - 140
    this.addChild(dialog)
    this._dialogs.push(dialog)
    this._animate()
  }
  
  /**
   * add question
   * @param {string} text text
   * @param {string} trueText text for true
   * @param {string} falseText text for false
   * @param {function({number})} callback callback
   */
  slider.addQuestion = function (text, trueText, falseText, callback){
    let dialog = Question.create(app, text, trueText, falseText, callback)
    dialog.transform.position.y = -this._getHeight() - 140
    this.addChild(dialog)
    this._dialogs.push(dialog)
    this._animate()
  }

  return slider
}
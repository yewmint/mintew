import * as Text from './text'

/**
 * create a question dialog
 * 
 * @export
 * @param {Game} app 
 * @param {string} text 
 * @param {string} trueText 
 * @param {string} falseText 
 * @param {function({number})} callback 
 * @returns {Entity}
 */
export function create (app, text, trueText, falseText, callback){
  let frameEnt = app.entity()
  frameEnt.attach('sprite', 'question-dialog')

  let textEnt = Text.create(app, text)
  textEnt.transform.position.x = 240 - textEnt.text.width / 2
  textEnt.transform.position.y = 80 - textEnt.text.height / 2 + 10

  let trueEnt = Text.create(app, trueText)
  trueEnt.transform.position.x = 130 - trueEnt.text.width / 2
  trueEnt.transform.position.y = 80 - trueEnt.text.height / 2 - 40
  
  let falseEnt = Text.create(app, falseText)
  falseEnt.transform.position.x = 350 - falseEnt.text.width / 2
  falseEnt.transform.position.y = 80 - falseEnt.text.height / 2 - 40

  let ent = app.entity()
  ent.addChild(frameEnt)
  ent.addChild(textEnt)
  ent.addChild(trueEnt)
  ent.addChild(falseEnt)

  ent.attach('click', (x, y) => {
    let isSelected = false
    let answer = null

    if (x > 20 && x < 240 && y > 20 && y < 60){
      isSelected = true
      answer = true

    }
    else if (x > 240 && x < 460 && y > 20 && y < 60){
      isSelected = true
      answer = false
    }

    if (!isSelected){
      return
    }

    ent.select(answer)
    if (typeof(callback) === 'function'){
      callback(answer)
    }
    ent.remove('click')
  })

  /**
   * change sprite texture by selection
   */
  ent.select = (isTrue) => {
    if (isTrue){
      frameEnt.sprite.imageName = 'question-dialog-true'
    }
    else {
      frameEnt.sprite.imageName = 'question-dialog-false'
    }
  }

  return ent
}
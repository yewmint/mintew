import * as Text from './text'

export function create (app, text){
  let frameEnt = app.entity()
  frameEnt.attach('sprite', 'normal-dialog')

  let textEnt = Text.create(app, text)
  textEnt.transform.position.x = 240 - textEnt.text.width / 2
  textEnt.transform.position.y = 80 - textEnt.text.height / 2

  let ent = app.entity()
  ent.addChild(frameEnt)
  ent.addChild(textEnt)

  return ent
}
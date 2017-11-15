



async function init(){
  
  
  let bg = app.entity()
  bg.attach('sprite', 'bg')
  app.root.addChild(bg)

  let slider = DialogSlider.create(app)
  slider.addDialog('无可奉告')
  slider.addQuestion(
    '会不会有一种内定、钦定的感觉？', 
    '吼啊', 
    '无可奉告',
    isTrue => console.log(isTrue)
  )
  app.root.addChild(slider)
  
  // let dialog = Dialog.create(app, '无可奉告')
  // app.root.addChild(dialog)

  // let question = Question.create(
  //   app, 
  //   '会不会有一种内定、钦定的感觉？', 
  //   '吼啊', 
  //   '无可奉告',
  //   isTrue => console.log(isTrue)
  // )
}

app.run(init)

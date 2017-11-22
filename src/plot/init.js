import plot from './plots'

async function init(){
  plot.init()
  
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
}

app.run(init)

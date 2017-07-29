'use strict'
/**
 * create a cavas to paint graph
 */
const paintTween = function (tween){
  let cvs = document.createElement('canvas')
  cvs.width = 100
  cvs.height = 100
  document.body.appendChild(cvs)

  let webgl = new window.Mintew.WebGL(cvs)
  webgl.init()
  webgl.view(700, 700)
  webgl.translate(0, 0)
  webgl.rotate(0)
  webgl.scale(1, 1)
  webgl.pivot(0, 0)
  webgl.clear()

  let line = webgl.line()

  webgl.color([0.0, 1.0, 0.0, 1.0])
  line.begin(100, 100)
  line.end(100, 600)
  webgl.drawLine(line)

  line.begin(100, 100)
  line.end(600, 100)
  webgl.drawLine(line)

  webgl.color([1.0, 0.0, 0.0, 1.0])
  for (let i = 0; i < 100; ++i){
    line.begin(i * 5 + 100, tween(i / 100) * 500 + 100)
    let k = i + 1
    line.end(k * 5 + 100, tween(k / 100) * 500 + 100)
    webgl.drawLine(line)
  }
}

describe('Tween', function(){
  it('should tween linear', function (){
    paintTween(window.Mintew.Utils.Tween.linear)
  })

  it('should tween square', function (){
    paintTween(window.Mintew.Utils.Tween.easeIn)
    paintTween(window.Mintew.Utils.Tween.easeOut)
    paintTween(window.Mintew.Utils.Tween.easeInOut)
  })

  it('should tween cubic', function (){
    paintTween(window.Mintew.Utils.Tween.cubicIn)
    paintTween(window.Mintew.Utils.Tween.cubicOut)
    paintTween(window.Mintew.Utils.Tween.cubicInOut)
  })

  it('should tween quartic', function (){
    paintTween(window.Mintew.Utils.Tween.quarticIn)
    paintTween(window.Mintew.Utils.Tween.quarticOut)
    paintTween(window.Mintew.Utils.Tween.quarticInOut)
  })
})

require('./tween-invoker.js')

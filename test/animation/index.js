const Texture = Mintew.Modules.Video.Texture
const Sprite = Mintew.Modules.Video.Sprite
const Mat = Mintew.Modules.Math.Mat
const Point = Mintew.Modules.Math.Point
const { Animator, AnimationType } = Mintew.Modules.Animation

const { resolve } = require('path')

const getContext = function (){
  let canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 100
  document.body.appendChild(canvas)
  let webgl = new window.Mintew.WebGL(canvas)
  webgl.init()
  webgl.view(700, 700)
  webgl.clear()
  return webgl
}

let wgl = getContext()
let texture = null
let sprite = null
let animator = new Animator

describe('Animator', function (){
  it('should move sprite correctly', function (done){
    let img = document.createElement("img")
    img.src = resolve(__dirname, "test.jpg")
    img.onload = ()=> {
      texture = new Texture(img, wgl)
      sprite = new Sprite(wgl, texture)
      animator.moveTo(sprite, new Point(500, 500), 100, AnimationType.LINEAR)
        .then(() => {
          wgl.release()
          wgl = null
          done()
        })
      let repaint = () => {
        if (!wgl) return
        wgl.clear()
        sprite.paint()
        requestAnimationFrame(repaint)
      }
      requestAnimationFrame(repaint)
    }
  })
})

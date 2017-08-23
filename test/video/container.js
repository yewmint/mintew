const Texture = Mintew.Modules.Video.Texture
const Sprite = Mintew.Modules.Video.Sprite
const Container = Mintew.Modules.Video.Container
const Mat = Mintew.Modules.Math.Mat
const Point = Mintew.Modules.Math.Point
const { resolve } = require('path')

let wgl = window.videoMocks.vwebgl
let texture = null
let sprite = null
let container = null

describe('Container', function (){
  it('should create container correctly', function (done){
    container = new Container
    let img = document.createElement("img")
    img.src = resolve(__dirname, "test.jpg")
    img.onload = ()=> {
      texture = new Texture(img, wgl)
      sprite = new Sprite(wgl, texture)
      container.addChild(sprite)
      done()
    }
  })

  it('should paint sprite correctly', function (){
    wgl.clear()
    container.position = new Point(350, 350)
    container.scale = new Point(2, 2)
    container.rotation = Math.PI /2
    container.pivot = new Point(128, 80)
    container.opacity = 0.5
    container.paint()
  })
})

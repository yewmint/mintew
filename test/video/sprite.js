const Texture = Mintew.Modules.Video.Texture
const Sprite = Mintew.Modules.Video.Sprite
const Mat = Mintew.Modules.Math.Mat
const Point = Mintew.Modules.Math.Point
const { resolve } = require('path')

let wgl = window.videoMocks.webgl
let texture = null
let sprite = null

describe('Sprite', function (){
  it('should create sprite correctly', function (done){
    let img = document.createElement("img")
    img.src = resolve(__dirname, "test.jpg")
    img.onload = ()=> {
      texture = new Texture(img, wgl)
      sprite = new Sprite(wgl, texture)
      done()
    }
  })

  it('should paint sprite correctly', function (){
    wgl.clear()
    sprite.paint()
    sprite.position.x = 256
    sprite.paint(Mat.eye(4, 1))
    sprite.pivot.x = 128
    sprite.paint(Mat.eye(4, 1))
    sprite.pivot = new Point(128, 80)
    sprite.rotation = Math.PI / 4
    sprite.position.y = 360
    sprite.scale.x = 2
    sprite.opacity = 0.5
    sprite.paint(Mat.eye(4, 1))
  })
})

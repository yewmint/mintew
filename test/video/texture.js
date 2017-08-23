const Texture = Mintew.Modules.Video.Texture
const { resolve } = require('path')

let wgl = window.videoMocks.webgl
let texture = null

describe('Texture', function (){
  it('should create texture correctly', function (done){
    let img = document.createElement("img")
    img.src = resolve(__dirname, "test.jpg")
    img.onload = ()=> {
      texture = new Texture(img, wgl)
      done()
    }
  })

  it('should convert coordinates correctly', function (){
    let pt = texture.convCoord(1, 1)
    expect(pt.x).to.eql(1)
    expect(pt.y).to.eql(0.625)
  })
})

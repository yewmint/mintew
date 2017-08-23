const TextureLoader = Mintew.Modules.Video.TextureLoader
const { resolve } = require('path')

let wgl = window.videoMocks.webgl
let loader = new TextureLoader(wgl)
let textures = null

describe('TextureLoader', function (){
  it('should push url correctly', function (){
    loader.push(resolve(__dirname, 'test.jpg'))
    expect(loader._queue.size).to.eql(1)
  })

  it('should load url correctly and return textures', function (done){
    loader.load()
      .then((ts)=> {
        textures = ts
        expect(textures.size).to.eql(1)
        done()
      })
      .catch((err)=> done(err))
  })
})

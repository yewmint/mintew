const { resolve } = require('path')
const SoundLoader = window.Mintew.SoundLoader

let loader = new SoundLoader
let sound = null
let source = null

describe('SoundLoader', function (){
  it('should push url correctly', function (){
    loader.push(resolve(__dirname, 'test.mp3'))
    expect(loader._queue.size).to.eql(1)
  })

  it('should load url correctly and return sound', function (done){
    loader.load()
      .then((s)=> {
        sound = s
        done()
      })
      .catch((err)=> done(err))
  })
})

describe('Sound', function (){
  it('should have audio loaded', function (){
    expect(sound.get('test')._audio.readyState).to.be.above(2)
  })

  it('should control audio correctly', function (){
    source = sound.get('test')
    sound.mute()
    sound.volumn = 1
    sound.stop()
  })
})

describe('Source', function (){
  it('should control source correctly', function (){
    source.volumn = 1
    source.pause()
    source.stop()
    source.play()
    source.loop = false
    source.volumn = 1
  })

  it('should fade in correctly', function (){
    source.fadeIn()
  })
})

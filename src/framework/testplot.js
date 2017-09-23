const createBackground = function (ctx){
  let go = ctx.gameObject()
  go.addComponent('sprite', 'backgraound')
  return go
}

const createTitle = function (ctx){
  let go = ctx.gameObject()
  go.addComponent('sprite', 'title')
  return go
}

const createBGM = function (ctx){
  let go = ctx.gameObject()
  go.addComponent('source', 'bgm')
  go.getComponent('source').loop = true
  go.getComponent('source').play = true
  return go
}

class UserComponent extends Component {
  constructor (cb){
    this._pressCb = cb
  }

  init (ctx){
    ctx.input.on('click', () => this._cb())
  }

  _cb (x, y){
    if (this.sprite.rect.inside(x, y)){
      this._pressCb()
    }
  }
}

const createStart = function (ctx, cb) {
  ctx.registerComponent('press', UserComponent)
  let go = ctx.gameObject()
  go.addComponent('sprite', 'title')
  go.addComponent('press', cb)
  return go
}

const plot = function (ctx){
  let bg = createBackground(ctx)
  let title = createTitle(ctx)
  let bgm = createBGM(ctx)
  let start = createStart(ctx, () => console.log('game start !'))
}

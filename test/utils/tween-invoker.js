const TweenInvoker = Mintew.Utils.TweenInvoker

const tweenBlock = function (func){
  let block = document.createElement('div')
  block.style.width = '20px'
  block.style.height = '20px'
  block.style.backgroundColor = 'cyan'
  document.body.appendChild(block)

  return func(500, 0, 300, (val)=> block.style.marginLeft = val + 'px')
}

const update = ()=> {
  requestAnimationFrame(update)
  TweenInvoker.update()
}

requestAnimationFrame(update)

describe('TweenInvoker', function (){
  it('should automatically tween linear', function (){
    tweenBlock(TweenInvoker.linear)
  })

  it('should automatically tween square', function (){
    tweenBlock(TweenInvoker.easeIn)
    tweenBlock(TweenInvoker.easeOut)
    tweenBlock(TweenInvoker.easeInOut)
  })

  it('should automatically tween cubic', function (){
    tweenBlock(TweenInvoker.cubicIn)
    tweenBlock(TweenInvoker.cubicOut)
    tweenBlock(TweenInvoker.cubicInOut)
  })

  it('should automatically tween quartic', function (){
    tweenBlock(TweenInvoker.quarticIn)
    tweenBlock(TweenInvoker.quarticOut)
    tweenBlock(TweenInvoker.quarticInOut)
  })
})

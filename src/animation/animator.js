import { AnimationType as Type } from './animation-type'
import { TweenInvoker } from '../utils'

export class Animator {
  constructor (){

  }

  tick (){
    TweenInvoker.update()
  }

  animate (assign, dur, type){
    return TweenInvoker[type](dur, 0, 1, assign)
  }

  moveTo (spr, pos, dur, type = Type.LINEAR){
    let startX = spr.position.x
    let startY = spr.position.y

    let deltX = pos.x - startX
    let deltY = pos.y - startY

    let assign = (val) => {
      spr.position.x = startX + val * deltX
      spr.position.y = startY + val * deltY
    }

    return this.animate(assign, dur, type)
  }

  fadeTo (spr, opa, dur, type = Type.LINEAR){
    let start = spr.opacity
    let delt = opa - start
    let assign = (val) => spr.opacity = start + val * delt
    return this.animate(assign, dur, type)
  }

  rotateTo (spr, rotation, dur, type = Type.LINEAR){
    let start = spr.rotation
    let delt = rotation - start
    let assign = (val) => spr.rotation = start + val * delt
    return this.animate(assign, dur, type)
  }

  scaleTo (spr, scale, dur, type = Type.LINEAR){
    let startX = spr.scale.x
    let startY = spr.scale.y

    let deltX = scale.x - startX
    let deltY = scale.y - startY

    let assign = (val) => {
      spr.scale.x = startX + val * deltX
      spr.scale.y = startY + val * deltY
    }

    return this.animate(assign, dur, type)
  }
}

import { Mat } from '../math'
import { Context } from '../framework'
import { Entity } from '../framework/entity.js'
import { Component } from './component'

export class Click extends Component {
  static name (){
    return 'click'
  }

  constructor (entity, callback){
    super(entity)
    this._callback = callback
    this._dispatcher = Context.get('input')
    this._unregister = this._dispatcher.register(
      'click', 
      (ev) => this._handle(ev)
    )
  }

  _handle (event){
    let x = event.clientX
    let y = event.target.height - event.clientY

    let mat = Mat.coordiante(x, -y)
    let localMat = this.entity.transform.globalTransform.multiply(mat)

    x = localMat.element(0, 0)
    y = -localMat.element(1, 0)

    this._callback(x, y)
  }

  release (){
    super.release()
    this._unregister()
  }
}

Entity.register(Click)

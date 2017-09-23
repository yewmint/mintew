import { Component } from './component'
import { Mat, Rect, Point } from '../math'
import { Entity } from '../framework'

/**
* store position, pivot, rotation, scale and Transform
*/
export class Transform extends Component{
  static name (){
    return 'transform'
  }
  /**
  *
  */
  constructor (entity){
    super(entity)

    /**
    * if transform matrix is dirty
    * @private
    * @type {bool} _dirty
    */
    this._dirty = false

    /**
    * if modified in current update
    * @type {bool} modified
    */
    this.modified = false

    /**
    * mark transform matrix dirty
    * @type {function} _dirtify
    */
    this._dirtify = () => this._dirty = true

    /**
    * pivot of transform
    * @private
    * @type {Point} pivot
    */
    this._pivot = Point.origin()
    this._pivot.onChange(this._dirtify)

    /**
    * rotation of transform
    * @private
    * @type {number} rotation
    */
    this._rotation = 0

    /**
    * scale of transform
    * @private
    * @type {Point} scale
    */
    this._scale = Point.one()
    this._scale.onChange(this._dirtify)

    /**
    * position of transform
    * @private
    * @type {Point} position
    */
    this._position = Point.origin()
    this._position.onChange(this._dirtify)

    /**
    * local transformation, deduced from properties
    * @type {Mat} localTransform
    */
    this.localTransform = Mat.eye(4, 1)

    /**
    * global transformation, used for painting
    * @type {Mat} globalTransform
    */
    this.globalTransform = Mat.eye(4, 1)
  }

  /**
  * pivot of component
  */
  get pivot (){
    return this._pivot
  }

  /**
  * pivot of component
  */
  set pivot (val){
    val.onChange(this._dirtify)
    this._pivot = val
    this._dirtify()
  }

  /**
  * rotation of component
  */
  get rotation (){
    return this._rotation
  }

  /**
  * rotation of component
  */
  set rotation (val){
    this._rotation = val
    this._dirtify()
  }

  /**
  * scale of component
  */
  get scale (){
    return this._scale
  }

  /**
  * scale of component
  */
  set scale (val){
    val.onChange(this._dirtify)
    this._scale = val
    this._dirtify()
  }

  /**
  * position of component
  */
  get position (){
    return this._position
  }

  /**
  * position of component
  */
  set position (val){
    val.onChange(this._dirtify)
    this._position = val
    this._dirtify()
  }

  /**
  * udpate transform data
  */
  _updateTransform (){
    let pvtTran = Mat.translate(-this._pivot.x, -this._pivot.y)
    let rotTran = Mat.rotate(this._rotation)
    let sclTran = Mat.scale(this._scale.x, this._scale.y)
    let posTran = Mat.translate(this._position.x, this._position.y)

    // must multiply in order
    let tran = Mat.eye(4, 1)
    tran = tran.multiply(posTran)
    tran = tran.multiply(rotTran)
    tran = tran.multiply(sclTran)
    tran = tran.multiply(pvtTran)

    this.localTransform = tran
  }

  /**
  * extract data from component
  * @return {object}
  */
  get data (){
    return {
      position: this._position.data,
      rotation: this._rotation,
      scale: this._scale.data,
      pivot: this._pivot.data,
    }
  }

  /**
  * inject data into component
  * @param {object}
  */
  set data ({ position, rotation, scale, pivot }){
    this._position.data = position
    this._rotation = rotation
    this._scale.data = scale
    this._pivot.data = pivot
    this._updateTransform()
  }

  update (ctx){
    this.modified = false

    if (this._dirty){
      this._updateTransform()
      this._dirty = false
      this.modified = true
    }

    if (this.entity.transform.modified) {
      let tran = this.parent.globalTransform
      this.globalTransform = tran.multiply(this.localTransform)
      this.modified = true
    }
  }
}

Entity.register(Transform)

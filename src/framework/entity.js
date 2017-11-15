const componentClasses = new Map

export class Entity {
  static register (cls){
    componentClasses.set(cls.name(), cls)
  }

  constructor (){
    this._compos = new Map
    this._children = [] // have to sort
  }

  update (){
    for (let compo of this._compos.values()){
      compo.update()
    }

    for (let child of this._children){
      child.update()
    }
  }

  addChild (entity){
    this._children.push(entity)
    entity.parent = this
  }

  removeChild (entity){
    let idx = this._children.indexOf(entity)
    this._children.splice(idx, 1)
  }

  sortChildren (func){
    this._children(func)
  }

  attach (name, ...rest){
    if (this._compos.has(name)){
      console.warn('WARN: Try to add component which is already added.')
      return
    }

    let cls = componentClasses.get(name)
    let compo = new cls(this, ...rest)
    this[name] = compo
    this._compos.set(name, compo)
  }

  remove (name){
    if (!this._compos.has(name)){
      console.warn('WARN: Try to delete component that not added yet.')
      return
    }

    let compo = this._compos.get(name)
    compo.release()
    this._compos.delete(name)
    this[name] = null
  }
}

// sotre all component classes
const componentClasses = new Map

/**
 * Fundamental element in game engine,
 * various components can be attached to entity.
 * 
 * @export
 * @class Entity
 */
export class Entity {
  /**
   * register component into stores.
   * 
   * @static
   * @param {Class} cls 
   * @memberof Entity
   */
  static register (cls){
    componentClasses.set(cls.name(), cls)
  }

  /**
   * Creates an instance of Entity.
   * @memberof Entity
   */
  constructor (){
    this._compos = new Map
    this._children = [] // have to sort
  }

  /**
   * update all components and children
   * 
   * @memberof Entity
   */
  update (){
    for (let compo of this._compos.values()){
      compo.update()
    }

    for (let child of this._children){
      child.update()
    }
  }

  /**
   * add child
   * 
   * @param {Entity} entity 
   * @memberof Entity
   */
  addChild (entity){
    this._children.push(entity)
    entity.parent = this
  }

  /**
   * remove child
   * 
   * @param {Entity} entity 
   * @memberof Entity
   */
  removeChild (entity){
    let idx = this._children.indexOf(entity)
    this._children.splice(idx, 1)
  }

  /**
   * sort children by predict function
   * 
   * @param {any} func 
   * @memberof Entity
   */
  sortChildren (func){
    this._children.sort(func)
  }

  /**
   * attach component by name
   * 
   * @param {string} name 
   * @param {Object[]} rest 
   * @memberof Entity
   */
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

  /**
   * remove component by name
   * 
   * @param {string} name 
   * @memberof Entity
   */
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

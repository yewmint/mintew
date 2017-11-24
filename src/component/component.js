/**
 * Base class for all components.
 * 
 * @export
 * @class Component
 */
export class Component {
  /**
   * return name of component
   * 
   * @static
   * @returns {string}
   * @memberof Component
   */
  static name (){
    return 'component'
  }

  /**
   * Creates an instance of Component.
   * @param {Entity} entity 
   * @memberof Component
   */
  constructor (entity){
    this.entity = entity
  }

  /**
  * extract data from component
  * @return {object}
  */
  get data (){

  }

  /**
  * inject data into component
  * @param {object}
  */
  set data (val){

  }

  /**
   * get parent of entity to which current component is attached
   * 
   * @readonly
   * @memberof Component
   */
  get parent (){
    return this.entity.parent && this.entity.parent[this.constructor.name()]
  }

  /**
   * update component
   * 
   * @memberof Component
   */
  update (){

  }

  /**
   * release component
   * 
   * @memberof Component
   */
  release (){
    this.entity = null
  }
}

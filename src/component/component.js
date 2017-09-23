export class Component {
  static name (){
    return 'component'
  }

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

  get parent (){
    return this.entity.parent && this.entity.parent[this.constructor.name()]
  }

  update (){

  }

  release (){
    this.entity = null
  }
}

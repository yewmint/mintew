/**
 * Provides functionality to invoke update fucntion.
 */
export class Updateable {
  /**
   * construct a updateable object
   */
  constructor (){
    /**
     * @type {Map}
     */
    this._updateFuncs = new Map()
  }

  /**
   * update all registered functions
   */
  update (){
    for (let [key, func] of this._updateFuncs){
      func()
    }
  }
}

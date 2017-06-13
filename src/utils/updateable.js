/**
 * Provides functionality to invoke update fucntion.
 */
export class Updateable {
  /**
   * construct a updateable object
   */
  constructor (){
    /**
     * @type {Map} _updateFuncs functions to update
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

// map to store context
const context = new Map

/**
 * Provides access to context object.
 * 
 * @export
 * @class Context
 */
export class Context {
  /**
   * set context object
   * 
   * @static
   * @param {string} name 
   * @param {Object} obj 
   * @memberof Context
   */
  static set (name, obj){
    context.set(name, obj)
  }

  /**
   * get context object
   * 
   * @static
   * @param {string} name 
   * @returns {Object}
   * @memberof Context
   */
  static get (name){
    return context.get(name)
  }
}

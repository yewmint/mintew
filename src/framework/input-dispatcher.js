/**
 * Dispatch input event to listener
 * 
 * @export
 * @class InputDispatcher
 */
export class InputDispatcher {
  /**
   * Creates an instance of InputDispatcher.
   * @param {Canvas} canvas 
   * @memberof InputDispatcher
   */
  constructor (canvas){
    this._handlers = []
    this._canvas = canvas
  }

  /**
   * register listener to specified event type
   * 
   * @param {string} eventType 
   * @param {function(...args)} callback 
   * @returns {function} unregister
   * @memberof InputDispatcher
   */
  register (eventType, callback){
    if (!this._handlers[eventType]){
      this._initEvent(eventType)
    }

    this._handlers[eventType].push(callback)

    // return function to unregister callback
    return () => {
      let curHandlers = this._handlers[eventType]
      let idx = curHandlers.indexOf(callback)
      if (idx !== -1) curHandlers.splice(idx, 1)
    }
  }

  /**
   * initialize specified event type
   * 
   * @param {string} eventType 
   * @memberof InputDispatcher
   */
  _initEvent (eventType){
    this._handlers[eventType] = []
    this._canvas.addEventListener(eventType, event => this._handle(event))
  }

  /**
   * handle dom event
   * 
   * @param {Event} event 
   * @memberof InputDispatcher
   */
  _handle (event){
    if (!this._handlers[event.type]){
      return
    }

    for (let cb of this._handlers[event.type]){
      cb(event)
    }
  }
}
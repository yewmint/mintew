export class InputDispatcher {
  constructor (canvas){
    this._handlers = []
    this._canvas = canvas
  }

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

  _initEvent (eventType){
    this._handlers[eventType] = []
    this._canvas.addEventListener(eventType, event => this._handle(event))
  }

  _handle (event){
    if (!this._handlers[event.type]){
      return
    }

    for (let cb of this._handlers[event.type]){
      cb(event)
    }
  }
}
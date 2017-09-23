const context = new Map

export class Context {
  static set (name, obj){
    context.set(name, obj)
  }

  static get (name){
    return context.get(name)
  }
}

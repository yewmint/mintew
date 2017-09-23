import { Resource } from './resource'
import { Entity } from './entity'
import { WebGL } from '../webgl'
import { Context } from './context'

export class Game {
  constructor (parentId, width, height){
    this._initWebGL(parentId, width, height)
    // renderer = new Renderer(parentId)
    // player = new Player()
    // input = new Input()
    let resource = new Resource()
    Context.set('resource', resource)


    this._modules = {
      // renderer,
      // player,
      // input,
      resource,
    }

    // this.renderer = renderer
    // this.player = player
    // this.input = input
    this.resource = resource

    this.root = new Entity
  }

  async run (plot){
    await plot()
    this._triggerNextLoop()
  }

  async load (list){
    await this.resource.load(list, this.webgl)
  }

  entity (){
    let ent = new Entity
    ent.attach('base')
    ent.attach('transform')
    return ent
  }

  _initWebGL (id, width, height){
    let cvs = document.createElement('canvas')
    cvs.width = width
    cvs.height = height
    let ele = document.getElementById(id)
    ele.appendChild(cvs)
    this.webgl = new WebGL(cvs)
    this.webgl.init(width, height)
    this.webgl.clear()
    Context.set('webgl', this.webgl)
  }

  _triggerNextLoop (){
    requestAnimationFrame(() => this._loop())
  }

  _loop (){
    this.root.update()
    this._triggerNextLoop()
  }
}

import { Resource } from './resource'
import { Entity } from './entity'
import { WebGL } from '../webgl'
import { Context } from './context'
import { InputDispatcher } from './input-dispatcher'

/**
 * Game Application
 * 
 * @export
 * @class Game
 */
export class Game {
  /**
   * Creates an instance of Game.
   * @param {string} parentId id of parent div 
   * @param {number} width width of canvas
   * @param {number} height height of canvas
   * @memberof Game
   */
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

  /**
   * run plot function and trigger render loop
   * 
   * @param {function} plot 
   * @memberof Game
   */
  async run (plot){
    await plot()
    this._triggerNextLoop()
  }

  /**
   * load resources by uri
   * 
   * @param {string[]} list 
   * @memberof Game
   */
  async load (list){
    await this.resource.load(list, this.webgl)
  }

  /**
   * create entity
   * 
   * @returns {Entity}
   * @memberof Game
   */
  entity (){
    let ent = new Entity
    ent.attach('base')
    ent.attach('transform')
    return ent
  }

  /**
   * initialize webgl
   * 
   * @private
   * @param {string} id id of parent div
   * @param {number} width 
   * @param {number} height 
   * @memberof Game
   */
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
    this.input = new InputDispatcher(cvs)
    Context.set('input', this.input)
  }

  /**
   * trigger loop
   * 
   * @memberof Game
   */
  _triggerNextLoop (){
    requestAnimationFrame(() => this._loop())
  }

  /**
   * execute loop
   * 
   * @memberof Game
   */
  _loop (){
    this.webgl.clear()
    this.root.update()
    this._triggerNextLoop()
  }
}
